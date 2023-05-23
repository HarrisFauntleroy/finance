import React, { useContext, useState } from "react";

import { AssetControl } from "./AssetControl";

import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
} from "@chakra-ui/react";
import { PrivacyContext } from "../Providers/Privacy";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdExpand } from "react-icons/md";

export const ControlBar = () => {
  const { privacy, togglePrivacy } = useContext(PrivacyContext);

  const [toggleOverview, setToggleOverview] = useState(true);

  const handleClick = () => setToggleOverview(!toggleOverview);

  return (
    <Flex justify="space-between">
      <AssetControl />
      <Flex gap="8px">
        <Menu closeOnSelect={false}>
          <MenuButton as={Button}>
            <SettingsIcon />
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue="asc" type="radio">
              <MenuItemOption>Hide zero balances</MenuItemOption>
              <MenuDivider />
              <MenuItemOption
                icon={privacy ? <FiEyeOff /> : <FiEye />}
                onClick={() => togglePrivacy()}
              >
                Privacy mode
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Select placeholder="Sort by" width="max-content">
          <option>type</option>
        </Select>
        <Button onClick={handleClick}>
          <MdExpand />
        </Button>
      </Flex>
    </Flex>
  );
};
