import { Button } from "@chakra-ui/react";
import Image from "next/image";

const AddSave = () => {
  return (
    <Button
      w="10vw"
      h="40px"
      bg="#39A7FF"
      fontSize="16px"
      leftIcon={
        <Image
          src="@/icons/Save.svg"
          width={18}
          height={18}
          alt="Save Button"
        />
      }
      // onClick={(event) => handleSave}
    >
      Save
    </Button>
  );
};

export default AddSave;
