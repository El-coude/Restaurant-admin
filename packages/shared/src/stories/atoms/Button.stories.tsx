import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
    title: "UI/Atoms/Button",
    component: Button,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    rounded: true,
    label: "aaAAA",
};

export const OCBButton = Template.bind({});
OCBButton.args = {
    backgroundColor: "#499925",
    color: "white",
    label: "aaAAA",
};
