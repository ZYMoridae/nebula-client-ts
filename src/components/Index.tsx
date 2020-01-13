import * as React from "react";

import { Row, Col } from "antd";
import { Carousel, Icon, Button } from "antd";

import { Typography } from "antd";
import Typed from "react-typed";

import "./Index.css";
import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import "rc-banner-anim/assets/index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const { Title } = Typography;
const BgElement = Element.BgElement;

function NextArrow(props: any) {
  const { currentSlide, slideCount, className, onClick } = props;

  return (
    <div onClick={onClick}>
      <button className={"slick-arrow slick-next"}>
        <Icon type="right-circle" style={{fontSize: '16px', color: "grey"}}/>
      </button>
    </div>
  );
}

function PrevArrow(props: any) {
  const { currentSlide, slideCount, className, onClick } = props;

  return (
    <div onClick={onClick}>
      <button className={"slick-arrow slick-prev"}>
        <Icon type="left-circle" style={{fontSize: '16px', color: "grey"}}/>
      </button>
    </div>
  );
}

class Index extends React.Component {
  render() {
    const settings = {
      className: "center",
      centerMode: false,
      infinite: true,
      // centerPadding: "60px",
      slidesToShow: 5,
      speed: 500
      // prevArrow: <PrevArrow />,
      // nextArrow: <NextArrow />
    };

    return (
      <div>
        <Row>
          <Col span={24}>
            <Carousel>
              <div id="banner">
                <Row>
                  <Col span={12} offset={6}>
                    <h4 className="caption">New Year, New You</h4>
                  </Col>
                  <Col span={12} offset={6}>
                    <h4 className="h4">
                      In {new Date().getFullYear()}, I want to learn{" "}
                      <Typed
                        strings={[
                          "Piano.",
                          "Guitar.",
                          "Violin.",
                          "Cello.",
                          "Flute."
                        ]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop={true}
                      />
                    </h4>
                  </Col>
                </Row>
              </div>
            </Carousel>
          </Col>

          <div style={{ backgroundColor: "#f5f5f5" }}>
            <Col pull={4} push={4} span={16}>
              <Row
                type="flex"
                align="middle"
                gutter={[16, 32]}
                style={{ marginTop: "32px", marginBottom: "32px" }}
              >
                <Col span={24} style={{ textAlign: "center" }}>
                  <Title level={3}>A Better Way to Learn</Title>
                </Col>
              </Row>
              <Row gutter={[16, 32]} align="middle" className="intro-block">
                <Col md={8} sm={24}>
                  <div>
                    <Icon type="star" style={{ fontSize: "45px" }} />
                  </div>
                  <div>
                    <Title level={4}>Expert Teachers</Title>
                  </div>
                  <div>
                    Top rated instructors guide you in every step of your
                    journey
                  </div>
                </Col>
                <Col md={8} sm={24}>
                  <div>
                    <Icon type="control" style={{ fontSize: "45px" }} />
                  </div>
                  <div>
                    <Title level={4}>Personalized Lessons</Title>
                  </div>
                  <div>
                    Your style, your pace. Customized lessons designed for you
                  </div>
                </Col>
                <Col md={8} sm={24}>
                  <div>
                    <Icon
                      type="safety-certificate"
                      style={{ fontSize: "45px" }}
                    />
                  </div>
                  <div>
                    <Title level={4}>100% Guaranteed</Title>
                  </div>
                  <div>
                    Try a lesson. If you're not satisfied we'll refund your
                    unused balance
                  </div>
                </Col>
              </Row>
            </Col>

            <Col pull={4} push={4} span={16}>
              <Row style={{ marginTop: "32px", marginBottom: "32px" }}>
                <Col span={24}>
                  <Title level={4}>
                    Music Lessons | Discover your creative side.
                  </Title>
                  <div className="class-section">
                    <Slider {...settings}>
                      <div className="class-card">
                        <Row>
                          <Col span={24}>
                            <img src="https://prod-takelessons.netdna-ssl.com/images/public/landing/service-tile/piano.jpg.webp"></img>
                          </Col>
                          <Col span={24}>Piano 4.91(36,314)</Col>
                          <Col span={24}>from $15.00/lesson</Col>
                        </Row>
                      </div>
                      <div className="class-card">
                        <Row>
                          <Col span={24}>
                            <img src="https://prod-takelessons.netdna-ssl.com/images/public/landing/service-tile/singing.jpg.webp"></img>
                          </Col>
                          <Col span={24}>Singing 4.92(30,302)</Col>
                          <Col span={24}>from $15.00/lesson</Col>
                        </Row>
                      </div>
                      <div className="class-card">
                        <Row>
                          <Col span={24}>
                            <img src="https://prod-takelessons.netdna-ssl.com/images/public/landing/service-tile/guitar.jpg.webp"></img>
                          </Col>
                          <Col span={24}>Guitar 4.92(26,323)</Col>
                          <Col span={24}>from $15.00/lesson</Col>
                        </Row>
                      </div>
                      <div className="class-card">
                        <Row>
                          <Col span={24}>
                            <img src="https://prod-takelessons.netdna-ssl.com/images/public/landing/service-tile/violin.jpg.webp"></img>
                          </Col>
                          <Col span={24}>Piano 4.92(8,249)</Col>
                          <Col span={24}>from $15.00/lesson</Col>
                        </Row>
                      </div>
                      <div className="class-card">
                        <Row>
                          <Col span={24}>
                            <img src="https://prod-takelessons.netdna-ssl.com/images/public/landing/service-tile/drums.jpg.webp"></img>
                          </Col>
                          <Col span={24}>Drum 4.91(6,444)</Col>
                          <Col span={24}>from $15.00/lesson</Col>
                        </Row>
                      </div>
                      <div className="class-card">
                        <Row>
                          <Col span={24}>
                            <img src="https://prod-takelessons.netdna-ssl.com/images/public/landing/service-tile/cello.jpg.webp"></img>
                          </Col>
                          <Col span={24}>Cello 4.92(4659)</Col>
                          <Col span={24}>from $15.00/lesson</Col>
                        </Row>
                      </div>
                    </Slider>
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Start of the new section */}
            <Col pull={4} push={4} span={16}>
              <Row
                type="flex"
                align="middle"
                gutter={[16, 32]}
                style={{ marginTop: "32px", marginBottom: "32px" }}
              >
                <Col span={24} style={{ textAlign: "center" }}>
                  <Title level={3}>Connect Locally or Online</Title>
                </Col>
              </Row>
              <Row gutter={[64, 32]} align="middle" className="intro-block">
                <Col md={12} sm={24}>
                  <div>
                    <img
                      src="https://prod-takelessons.netdna-ssl.com/images/public/landing/icon/local.png"
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div>
                    <Title level={4}>Local Lessons</Title>
                  </div>
                  <div>
                    No matter where you live, chances are we can introduce you
                    to an amazing teacher in your neighborhood. You can take
                    lessons in the privacy of your own home or at your teacher's
                    location.
                  </div>
                </Col>
                <Col md={12} sm={24}>
                  <div>
                    <img
                      src="https://prod-takelessons.netdna-ssl.com/images/public/landing/icon/online.png"
                      style={{ height: "80px" }}
                    />
                  </div>
                  <div>
                    <Title level={4}>Online Lessons</Title>
                  </div>
                  <div>
                    Is your dream teacher on the other side of the country? No
                    problem. Now, you can meet your teacher online on your
                    smartphone or using a webcam on your computer. The world is
                    your classroom!
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={24} style={{ marginTop: "32px" }}>
                  <BannerAnim prefixCls="banner-quote" autoPlay arrow={false}>
                    <Element prefixCls="banner-quote-elem" key="0">
                      <BgElement
                        key="bg"
                        className="bg"
                        style={{
                          background: "#364D79"
                        }}
                      />
                      <TweenOne
                        className="banner-quote-title"
                        animation={{ y: 30, opacity: 0, type: "from" }}
                      ></TweenOne>
                      <TweenOne
                        className="banner-quote-text"
                        animation={{
                          y: 30,
                          opacity: 0,
                          type: "from",
                          delay: 100
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "32px",
                            marginRight: "32px",
                            textAlign: "left"
                          }}
                        >
                          <div>
                            <img
                              style={{ width: "16px" }}
                              src="https://prod-takelessons.netdna-ssl.com/images/public/landing/icon-quotes.png"
                              alt="Icon-quotes"
                            />
                          </div>
                          <p>
                            I can't even explain how great this made me feel. I
                            suddenly felt like I could actually achieve this
                            bucket list dream of mine.
                          </p>
                          <p style={{ marginTop: "32px" }}>
                            Kyle, Country Guitar (In-Person)
                          </p>
                        </div>
                      </TweenOne>
                    </Element>
                    <Element prefixCls="banner-quote-elem" key="1">
                      <BgElement
                        key="bg"
                        className="bg"
                        style={{
                          background: "#64CBCC"
                        }}
                      />
                      <TweenOne
                        className="banner-quote-title"
                        animation={{ y: 30, opacity: 0, type: "from" }}
                      ></TweenOne>
                      <TweenOne
                        className="banner-quote-text"
                        animation={{
                          y: 30,
                          opacity: 0,
                          type: "from",
                          delay: 100
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "64px",
                            marginRight: "64px",
                            textAlign: "left"
                          }}
                        >
                          <div>
                            <img
                              style={{ width: "16px" }}
                              src="https://prod-takelessons.netdna-ssl.com/images/public/landing/icon-quotes.png"
                              alt="Icon-quotes"
                            />
                          </div>
                          <p>
                            I love teaching because I love passing on my
                            knowledge to others who want to learn.
                          </p>
                          <p style={{ marginTop: "32px" }}>
                            Kathy, TakeLessons Teacher{" "}
                          </p>
                        </div>
                      </TweenOne>
                    </Element>
                  </BannerAnim>
                </Col>
              </Row>
            </Col>
          </div>
        </Row>

        <div style={{ backgroundColor: "#f5f5f5", marginTop: "32px" }}>
          <Row>
            <Col pull={4} push={4} span={16}>
              <Row
                type="flex"
                align="middle"
                gutter={[16, 32]}
                style={{ marginTop: "32px", marginBottom: "32px" }}
              >
                <Col span={24} style={{ textAlign: "center" }}>
                  <Icon type="read" style={{ fontSize: "45px" }} />
                  <Title level={3}>Become a Teacher</Title>
                  <div>
                    If you qualify, come join us and earn a great living doing
                    what you love.
                  </div>
                  <div style={{ marginTop: "32px" }}>
                    <a>
                      Start Teaching <Icon type="right" />
                    </a>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col pull={4} push={4} span={16}>
              <Row
                type="flex"
                align="middle"
                gutter={[16, 32]}
                style={{ marginTop: "32px", marginBottom: "16px" }}
              >
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => {
                      location.href = "/teachers";
                    }}
                  >
                    View Teachers In Your Area <Icon type="right" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Index;
