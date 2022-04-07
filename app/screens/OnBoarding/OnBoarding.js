import React from 'react';
import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//constants
// .. represents parent of current directory and so on.
import { images, theme } from "../../constants";

//images

const { onboarding1, onboarding2, onboarding3 } = images;
//theme

const { COLORS, FONTS, SIZES } = theme;

//Dummy data
const onBoardings = [
    {
        title: "Let's Travelling",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding1
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding2
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding3
    }
];




const OnBoarding = () => {

    const [completed, setCompleted] = React.useState(false);

    //Render
    //ScrollX and ScrollX determines the scrolling direction of dotcomponent
    const ScrollX = new Animated.Value(0);

    React.useEffect(() => {
        ScrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true);
            }
        });

        return () => ScrollX.removeListener();
    }, []);

    function renderContent() {

        const dotPosition = Animated.divide(ScrollX, SIZES.width)

        return (
            <Animated.ScrollView
                //handling animation direction
                horizontal
                pagingEnabled
                scrollEnabled
                //determines how quickly scroll view decelare after the user lift fingers
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="end"
                //scrollindicator disable 
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: ScrollX } } },
                ], { useNativeDriver: false })}
            >
                {onBoardings.map((item, index) => (
                    <View
                        key={index}
                        style={{ width: SIZES.width }}
                    >
                        {/* images */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: "100%"

                                }}
                            />
                        </View >


                        {/* Text */}
                        <View
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: 40,
                                right: 40
                            }}
                        >
                            <Text style={{
                                ...FONTS.h1,
                                color: COLORS.gray,
                                textAlign: 'center'
                            }}
                            >
                                {item.title}

                            </Text>
                            <Text
                                style={{
                                    ...FONTS.h3,
                                    textAlign: 'center',
                                    marginTop: SIZES.base,
                                    color: COLORS.gray
                                }}
                            >
                                {item.description}
                                
                            </Text>
                        </View>


                        {/* Button */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                paddingLeft: 20,
                                width: 150,
                                height: 60,
                                justifyContent: 'center',
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                backgroundColor: COLORS.blue
                            }}
                            onPress={() => console.log("Button pressed")}
                        >
                            <Text style={{ ...FONTS.h1, color: COLORS.white }}>{completed ? "Let's go" : "Skip"}</Text>

                        </TouchableOpacity>

                    </View>
                ))}
            </Animated.ScrollView>
        )

    }

    function renderDots() {

        const dotPosition = Animated.divide(ScrollX, SIZES.width);

        return (
            <View style={styles.dotsContainer}>

                {onBoardings.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });
                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                    });
                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize, }]}

                        >
                        </Animated.View>
                    )
                })}

            </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    dotRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '30%' : '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotsContainer: {
        flexDirection: 'row',
        height: SIZES.padding
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius / 2
    }
})

export default OnBoarding;