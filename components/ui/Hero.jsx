"use client";
import { useRouter } from "next/navigation";
import { Element, Link as LinkScroll } from "react-scroll";
import Button from "./button";
const Hero = () => {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push("/dashboard");
  };

  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-3 uppercase text-p3">
              Ace Your Interviews with Confidence
            </div>
            <h1 className="mb-6 h3 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Smarter Prep. <br />
              Smarter Results.
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Our AI-powered Interview Trainer helps you practice and perfect
              your technical and soft skills—ensuring you walk into every
              interview with confidence.
            </p>
            <LinkScroll to="features" offset={-100} spy smooth>
              <Button onClick={handleSubscribe} icon="/images/zap.svg">
                🚀 GET STARTED Now!
              </Button>
            </LinkScroll>
          </div>

          <div className="absolute -top-32 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res">
            <img
              src="/images/hero.png"
              className="size-1230 max-lg:h-auto"
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
