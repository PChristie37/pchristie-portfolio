import fallingAnimation from "~/animations/fallingAnimation.json";
import { useLottie } from "lottie-react";

export default function Index() {
  const options = {
    animationData: fallingAnimation,
    loop: true
  };

  const { View } = useLottie(options);
  return <div className="w-1/2 justify-center">{View}</div>;
}
