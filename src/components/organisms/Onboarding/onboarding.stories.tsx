import Onboarding from ".";

export default {
  title: "components/organisms/Onboarding",
  component: Onboarding,
};

export const onboarding = () => {
  return <Onboarding />;
};

onboarding.story = {
  name: "Default",
};
