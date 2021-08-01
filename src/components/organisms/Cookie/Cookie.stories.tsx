import Cookie from "./Cookie";

export default {
  title: "components/organisms/Cookie",
  component: Cookie,
};

export const imgBox = () => {
  return (
    <div>
      <Cookie />
    </div>
  );
};

imgBox.story = {
  name: "Default",
};
