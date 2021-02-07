import Slider from "react-slick";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Box from "@material-ui/core/Box";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import colors from "../../palette";

const useStyles = makeStyles({
  root: {
    marginBottom: "20px",
  },
  box: {
    width: "170px",
    borderRadius: "10px",
  },
  imageBox: {
    padding: "15px",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    margin: "0 auto",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
    boxShadow: "0 4px 4px 0 rgb(136 118 118 / 15%)",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  arrowButton: {
    color: "black",
    borderRadius: "50%",
    backgroundColor: "white",
    padding: "15px",
    width: "50px",
    height: "50px",
    boxShadow: "0 4px 4px 0 rgb(136 118 118 / 15%)",
    zIndex: 2,
    "&:hover": {
      color: "black",
      zIndex: 2,
      backgroundColor: colors.lightGrey,
    },
  },
});

function NextArrow(props) {
  const classes = useStyles();

  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon className={clsx(className, classes.arrowButton)} style={{ ...style }} onClick={onClick} />
  );
}

function BackArrow(props) {
  const classes = useStyles();

  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return <ArrowBackIosIcon className={clsx(className, classes.arrowButton)} style={{ ...style }} onClick={onClick} />;
}

export default function Carousels({ name }: Props) {
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
  };

  // TODO: Need to fetch list from API
  return (
    <>
      <Typography variant={"h5"} className={classes.root}>
        <b>{name}</b>
      </Typography>
      <Slider {...settings}>
        <Box component="div" className={classes.box}>
          <div className={classes.imageBox}>
            <img src={"/images/seoul.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Seoul</Typography>
          </div>
        </Box>
        <Box component="div">
          <div className={classes.imageBox}>
            <img src={"/images/bangkok.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Bangkok</Typography>
          </div>
        </Box>
        <Box component="div">
          <div className={classes.imageBox}>
            <img src={"/images/perth.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Perth</Typography>
          </div>
        </Box>
        <Box component="div">
          <div className={classes.imageBox}>
            <img src={"/images/singapore.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Singapore</Typography>
          </div>
        </Box>
        <Box component="div">
          <div className={classes.imageBox}>
            <img src={"/images/bejing.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Bejing</Typography>
          </div>
        </Box>
        <Box component="div">
          <div className={classes.imageBox}>
            <img src={"/images/tokyo.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Tokyo</Typography>
          </div>
        </Box>
        <Box component="div" className={classes.box}>
          <div className={classes.imageBox}>
            <img src={"/images/seoul.jpg"} alt={name} className={classes.image} />
            <Typography className={classes.text}>Seoul</Typography>
          </div>
        </Box>
      </Slider>
    </>
  );
}

interface Props {
  name: string;
}
