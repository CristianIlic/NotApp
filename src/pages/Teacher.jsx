import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const Teacher = () => {
  return (
    <div className="body-teacher">
      <h2>Notas</h2>
      <div className="accordion">
        <Accordion allowToggle>
          <AccordionItem border="none">
            <h3>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <p>Curso 1</p>
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="none">
            <h3>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <p>Curso 2</p>
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Teacher;
