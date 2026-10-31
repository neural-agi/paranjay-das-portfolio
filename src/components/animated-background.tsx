"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";

gsap.registerPlugin(ScrollTrigger);

// These are object names used by the source Spline scene's keycap reveal animation.
// They are intentionally not treated as Paranjay technology IDs: the scene artwork
// contains fixed reference labels and the runtime has no text/texture editing API.
const SCENE_KEYCAP_NAMES = ["js", "C#", "nextjs", "docker", "linux", "git"];
const SOURCE_SCENE_TEXT_OBJECTS = [
  "text-desktop-dark",
  "text-desktop",
  "text-mobile-dark",
  "text-mobile",
];

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const activeSceneObjectRef = useRef<string | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [activeSection, setActiveSection] = useState<Section>("hero");

  // Animation controllers refs
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>();

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const router = useRouter();

  // --- Event Handlers ---

  const handleMouseHover = (e: SplineEvent) => {
    if (e.target.name === "body" || e.target.name === "platform") {
      if (activeSceneObjectRef.current) playReleaseSound();
      activeSceneObjectRef.current = null;
      return;
    }

    if (activeSceneObjectRef.current !== e.target.name) {
      if (activeSceneObjectRef.current) playReleaseSound();
      playPressSound();
      activeSceneObjectRef.current = e.target.name;
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    const handleKeyUp = () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      activeSceneObjectRef.current = null;
    };
    const handleKeyDown = (e: SplineEvent) => {
      if (!splineApp || isInputFocused()) return;
      if (activeSceneObjectRef.current !== e.target.name) {
        playPressSound();
        activeSceneObjectRef.current = e.target.name;
      }
    };

    splineApp.addEventListener("keyUp", handleKeyUp);
    splineApp.addEventListener("keyDown", handleKeyDown);
    splineApp.addEventListener("mouseHover", handleMouseHover);
    return () => {
      splineApp.removeEventListener("keyUp", handleKeyUp);
      splineApp.removeEventListener("keyDown", handleKeyDown);
      splineApp.removeEventListener("mouseHover", handleMouseHover);
    };
  };

  // --- Animation Setup Helpers ---

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile, });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  };

  const setupScrollAnimations = () => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions
    createSectionTimeline("#skills", "skills", "hero");
    createSectionTimeline("#projects", "projects", "skills", "top 70%");
    createSectionTimeline("#contact", "contact", "projects", "top 30%");
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => { }, stop: () => { } };

    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());

    const start = () => {
      removePrevTweens();
    SCENE_KEYCAP_NAMES
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      SCENE_KEYCAP_NAMES.forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };

    return { start, stop };
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  // --- Effects ---

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp) return;
    const removeSplineListeners = handleSplineInteractions();
    setupScrollAnimations();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      removeSplineListeners?.();
      keycapAnimationsRef.current?.stop();
    }

  }, [splineApp, isMobile]);

  // The source scene's text readout is reference-specific and has fixed copy.
  // Canonical technology names and relationships are shown in the HTML selector.
  useEffect(() => {
    if (!splineApp) return;
    SOURCE_SCENE_TEXT_OBJECTS.forEach((name) => splineApp.findObjectByName(name)?.hide());
    splineApp.setVariable("heading", "");
    splineApp.setVariable("desc", "");
  }, [splineApp]);

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true, // Start paused
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
    }

    const manageAnimations = async () => {
      // Handle Rotate/Teardown Tweens
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      // Handle Contact Section Animations
      if (activeSection === "contact") {
        await sleep(600);
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp]);

  // Reveal keyboard on load/route change
  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    router.push("/" + hash, { scroll: false });

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline
        className="w-full h-full fixed"
        ref={splineContainer}
        onLoad={(app: Application) => {
          // Each source key keeps its geometry in separate keycap meshes; its baked
          // label/icon is a child object named "legend". Hide those labels while
          // retaining the physical caps because runtime text/texture replacement is
          // not supported by the installed Spline API.
          app.getAllObjects().filter((object) => object.name === "legend").forEach((object) => object.hide());
          app.findObjectByName("bongo-cat")?.hide();
          SOURCE_SCENE_TEXT_OBJECTS.forEach((name) => app.findObjectByName(name)?.hide());
          setSplineApp(app);
          bypassLoading();
        }}
        scene="/assets/skills-keyboard.spline"
      />
    </Suspense>
  );
};

export default AnimatedBackground;
