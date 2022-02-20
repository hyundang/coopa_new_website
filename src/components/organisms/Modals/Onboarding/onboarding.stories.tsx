import { useState } from "react";
import Onboarding from ".";

export default {
  title: "components/organisms/Onboarding",
  component: Onboarding,
};

export const onboarding = () => {
  const [isOpen, setIsOpen] = useState(true);
  return <Onboarding isOpen={isOpen} setIsOpen={setIsOpen} />;
};

onboarding.story = {
  name: "Default",
};
