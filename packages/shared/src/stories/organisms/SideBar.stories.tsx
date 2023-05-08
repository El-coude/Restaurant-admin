import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SideBar, SideBarElement } from "./SideBar";

export default {
    title: "UI/Oranisms/SideBar",
    component: SideBar,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => (
    <SideBar {...args} />
);
export const Open = Template.bind({});
let open = true;
Open.args = {
    children: (
        <>
            <SideBarElement
                icon={<img src="/favicon.ico" />}
                text="Dashboard"
                link="/dash"
                open={true}
            />
            <SideBarElement
                icon={<img src="/favicon.ico" />}
                text="Dash"
                link="/dash"
                open={true}
            />
        </>
    ),
    logo: (
        <img
            src="/favicon.ico"
            width={42}
            style={{
                margin: "auto",
                display: "block",
            }}
        />
    ),
    toggle: (open) => {
        console.log(open);
    },
};

export const Closed = Template.bind({});
Closed.args = {
    children: (
        <SideBarElement
            icon={<img src="/favicon.ico" />}
            text="Dashboard"
            link="/dash"
            open={false}
        />
    ),
    logo: (
        <img
            src="/favicon.ico"
            width={42}
            style={{
                margin: "auto",
                display: "block",
            }}
        />
    ),
    toggle: (open) => {
        console.log(open);
    },
};
