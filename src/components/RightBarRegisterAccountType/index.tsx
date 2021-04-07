// External
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import { Grid, Typography } from "@material-ui/core";

// Custom Component
import OperationCard from "./OperationCard";

const useStyles = makeStyles({
  root: {
    height: "100%",
    position: "relative",
  },
  titleText: {
    fontWeight: 500,
    marginBottom: "10px",
  },
  titleWrapper: {
    marginBottom: "72px",
  },
});

export default function RightBarRegisterAccountType({ onNext }: { onNext: (role: string) => void }) {
  const classes = useStyles();

  const [cardSelected] = useState<number>();

  const goNext = (index: number) => {
    if (index === 0) {
      onNext("artist");
    }

    if (index === 1) {
      onNext("studio");
    }
  };

  return (
    <Grid container className={classes.root} alignItems={"center"} justify={"center"}>
      <div>
        <div className={classes.titleWrapper}>
          <Typography variant={"h5"} className={classes.titleText}>
            What type of account would you like to create?
          </Typography>
          <Typography variant={"subtitle2"}>
            Nullam et dui feugiat porta velit non imperdiet leo. Ut hendrerit purus vel velit dictum
          </Typography>
        </div>
        <OperationCard
          name={"Artist"}
          description={"Join as an artist to have your own account."}
          imageUrl={"/images/icons/artist.svg"}
          selected={cardSelected === 0}
          onSelect={() => {
            goNext(0);
          }}
        />
        <OperationCard
          name={"Studio"}
          description={"Join as a studio to manage a studio account and add multiple artist accounts."}
          imageUrl={"/images/icons/studio.svg"}
          selected={cardSelected === 1}
          onSelect={() => {
            goNext(1);
          }}
        />
      </div>
    </Grid>
  );
}
