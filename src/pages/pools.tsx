import { Box, Flex } from "@chakra-ui/react";
import TokenBalance from "@src/components/TokenBalance/TokenBalance";
import { Typography } from "@src/components/Typography";
import { Meta } from "@src/containers/Meta";
import Pools from "@src/containers/PoolPage";
import { Layout } from "@src/layouts";
import { ReactNode } from "react";

const Pool = () => {
  return (
    <>
      <Meta title="Pools | MikeToken" description="" />
      <Box minHeight={"100vh"}>

      <Flex maxWidth={"1200px"} w={"100%"} mx="auto" justifyContent={"center"}>
        <Typography textAlign={"left"} type="headline2" color={"text.primary"}>
        <TokenBalance address={"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"} />
        </Typography>
      </Flex>
       
        <Pools />
        {/* <div className="flex bg-default h-[100vh] justify-center items-center relative">
          <div className="text-center mb-20">
            <Typography type="headline2" className="text-primary mb-6">
              Coming soon
            </Typography>
            <Typography type="body1-r" className="text-primary mb-2">
              We are currently developing an exciting new feature for you!
            </Typography>
            <Typography type="body1-r" className="text-primary mb-2">
              Please be patient and check back later to discover our new
              feature.
            </Typography>
            <Typography type="body1-r" className="text-primary mb-2">
              Thank you for your continued support!
            </Typography>
          </div>
        </div> */}
      </Box>
    </>
  );
};

Pool.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Pool;
