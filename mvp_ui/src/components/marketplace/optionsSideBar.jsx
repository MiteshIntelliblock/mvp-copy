import {
  Flex,
  Select,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { ReactComponent as FilterIcon } from "../../assets/filterIcon.svg";
import { ReactComponent as SortIcon } from "../../assets/sort.svg";

export default function OptionsSideBar() {
  return (
    <Flex
      w="25%"
      h="47rem"
      alignItems="flex-start"
      direction="column"
      gap="0.56rem"
      padding="0.94rem"
      borderRadius="0.375rem"
      border="1px solid #D9D9D9"
      overflowY="scroll"
    >
      {/**Filter */}
      <Flex
        w="100%"
        bgColor="#F9F9F9"
        direction="column"
        borderRadius="6px"
        border="0.5px solid rgba(0,0,0, 0.15)"
      >
        <Flex
          alignItems="center"
          fontWeight="500"
          p="0.63rem 0.94rem"
          borderBottom="0.15px solid rgba(0,0,0,0.15)"
        >
          <FilterIcon />
          Filters
        </Flex>
        <Flex w="100%" p="0.63rem" direction="column" alignItems="flex-start">
          <DropDownMenu
            label={"Type of Auction or sale"}
            placeholder={"Select type of auction"}
            options={["Sale", "English Auction", "Dutch Auction"]}
          />
          <DropDownMenu
            label={"Project type"}
            placeholder={"Select type of project"}
            options={["Sale", "English Auction", "Dutch Auction"]}
          />
          <Text mb="0.31rem">Price range</Text>
          <RangeSlider aria-label={["min", "max"]} defaultValue={[0, 30]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack bg="darkGreen" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0}>
              <Flex borderRadius="50%" p="2" bgColor="darkGreen" />
            </RangeSliderThumb>{" "}
            <RangeSliderThumb index={1}>
              <Flex
                borderRadius="50%"
                p="0.4rem"
                border="3px solid"
                bgColor="white"
                borderColor="darkGreen"
              />
            </RangeSliderThumb>
          </RangeSlider>
          <Text fontSize="0.75rem" mb="0.63rem">
            $0
          </Text>
          <DropDownMenu
            label={"SDG"}
            placeholder={"Select type of SDG"}
            options={["Sale", "English Auction", "Dutch Auction"]}
          />
          <DropDownMenu
            label={"Country"}
            placeholder={"Select your country"}
            options={["Sale", "English Auction", "Dutch Auction"]}
          />
          <DropDownMenu
            label={"Registry"}
            placeholder={"Select type of registry"}
            options={["Sale", "English Auction", "Dutch Auction"]}
          />{" "}
          <DropDownMenu
            label={"Vintage year"}
            placeholder={"Select type of vintage year"}
            options={["Sale", "English Auction", "Dutch Auction"]}
          />
        </Flex>
      </Flex>
      {/** Sort */}
      <Flex
        w="100%"
        bgColor="#F9F9F9"
        direction="column"
        borderRadius="6px"
        border="0.5px solid rgba(0,0,0, 0.15)"
      >
        <Flex
          alignItems="center"
          fontWeight="500"
          p="0.63rem 0.94rem"
          borderBottom="0.15px solid rgba(0,0,0,0.15)"
          fontSize="1.25rem"
          gap="0.31rem"
          mb="0.94rem"
        >
          <SortIcon />
          Sort
        </Flex>
        <Select
          placeholder="Select type of sort by"
          fontSize="0.875rem"
          mb="0.62rem"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Select>
      </Flex>
    </Flex>
  );
}

function DropDownMenu({ label, placeholder, options }) {
  return (
    <>
      <Text mb="0.31rem">{label}</Text>
      <Select placeholder={placeholder} fontSize="0.875rem" mb="0.62rem">
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
    </>
  );
}
