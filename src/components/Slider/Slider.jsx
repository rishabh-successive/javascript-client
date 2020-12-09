
import React, { Component } from "react";
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/ math';
import { PUBLIC_IMAGE_FOLDER } from '../../config/ constants';
import centre from "./style";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerNo: 0,
      altText: "Default Banner",
      duration: 2000,
      height: 200,
      source: props.defaultBannerImage,
    }
  }
  componentDidMount() {
    console.log('>>>>',this.state.bannerNo);

    const timeDuration = this.state.duration;
    setInterval(() => {
      const currentBanner = this.state.bannerNo;
      const nextBanner = this.props.random ?
        getRandomNumber(5) : getNextRoundRobin(currentBanner, 6)
      this.setState({
        bannerNo: nextBanner,
        source: this.props.banner[nextBanner]
      })
    }, timeDuration);
  }
  render() {
    const {source, altText, height} = this.state;
    return(
      <img src={PUBLIC_IMAGE_FOLDER + source } alt={altText} height={ height } style={centre} />
    )
  }
}
export default Slider;