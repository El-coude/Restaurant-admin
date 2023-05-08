import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./Input";

export default {
    title: "UI/Atoms/Input",
    component: Input,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    rounded: true,
    label: "Enter Email",
    onChange: () => {
        console.log("changed");
    },
    onClick: () => {
        console.log("clicked");
    },
};
