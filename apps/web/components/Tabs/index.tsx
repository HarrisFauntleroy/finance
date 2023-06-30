import { Tabs as MantineTabs } from "@mantine/core";
import { ReactNode } from "react";

export type Tab = {
  value: string;
  label: string;
  icon: ReactNode;
  component: ReactNode;
};

type CustomTabProperties = {
  tabs: Tab[];
};

const Tabs = ({ tabs }: CustomTabProperties) => (
  <MantineTabs h="100%" defaultValue={tabs[0].value}>
    <MantineTabs.List grow>
      {tabs.map(({ value, icon, label }) => (
        <MantineTabs.Tab key={value} icon={icon} value={value}>
          {label}
        </MantineTabs.Tab>
      ))}
    </MantineTabs.List>
    <MantineTabs.List h="100%">
      {tabs.map(({ value, component }) => (
        <MantineTabs.Panel key={value} value={value} py="16px">
          {component}
        </MantineTabs.Panel>
      ))}
    </MantineTabs.List>
  </MantineTabs>
);

export default Tabs;
