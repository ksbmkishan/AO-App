import { View } from 'react-native';
import React from 'react';
import {
    G,
    Line,
    Path,
    Polygon,
    Rect,
    Svg,
    SvgCss,
    SvgXml,
    Text,
} from 'react-native-svg';
import { colors } from '../../config/Constants1';

const AstakCharts = ({ data }) => {
    console.log("jikiio", data?.chart[0]?.rashiIndex)


    return (
        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
            {data && <Svg width="350" height="330">
                <G rotation="0" origin="100, 50">
                    <Path d="M10 10L175 10L92.5 87.5L10 10" fill="none" stroke="orange" />
                    <Path d="M175 10L340 10L257.5 87.5L175 10" fill="none" stroke="orange" />
                    <Path d="M92.5 87.5L10 165L10 10" fill="none" stroke="orange" />
                    <Path
                        d="M92.5 87.5L175 165L257.5 87.5L175 10"
                        fill="none"
                        stroke="orange"
                    />
                    <Path d="M257.5 87.5L340 165L340 10" fill="none" stroke="orange" />
                    <Path
                        d="M92.5,87.5L175,165L92.5,242.5L10,165"
                        fill="none"
                        stroke="orange"
                    />
                    <Path
                        d="M257.5,87.5L340,165L257.5,242.5L175,165"
                        fill="none"
                        stroke="orange"
                    />
                    <Path d="M92.5,242.5L10,320L10,165" fill="none" stroke="orange" />
                    <Path
                        d="M175,165L257.5,242.5L175,320L92.5,242.5"
                        fill="none"
                        stroke="orange"
                    />
                    <Path d="M92.5,242.5L175,320L10,320" fill="none" stroke="orange" />
                    <Path d="M92.5,242.5L175,320L10,320" fill="none" stroke="orange" />
                    <Path d="M257.5,242.5L340,320L175,320" fill="none" stroke="orange" />
                    <Path d="M340,165L340,320L257.5,242.5" fill="none" stroke="orange" />
                    {/* First trangle */}

                    <G x="-82" y="-210">
                        <Text color="black" fill="black" fontWeight={"500"} fontSize="11" x="253" y="350">
                                {data?.chart[0]?.rashiIndex}
                        </Text>

                        <Text color="RED" fill="red" fontWeight={"500"} fontSize="12" x="249.25" y="295.1">
                        {data?.chart[0]?.planets[0]}
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="249.25" y="270.1">
                        {data?.chart[0]?.planets[1]}
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="249.25" y="250.1">
                         
                        </Text>


                    </G>

                    {/* second trangle */}

                    <G x="-165" y="-235">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="253.25" y="310.1">
                        {data?.chart[1]?.rashiIndex}
                        </Text>

                        <Text color="black" fill="red" fontWeight={"500"} fontSize="12" x="249.25" y="290.1">
                        {data?.chart[1]?.planets[0]}
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="249.25" y="270.1">
                           
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="210.25" y="270.1">
                           
                        </Text>



                    </G>

                    {/* third trangle */}

                    <G x="-235" y="-210">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="300.25" y="299.1">
                        {data?.chart[2]?.rashiIndex}
                        </Text>


                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="255.25" y="295.1">
                        {data?.chart[2]?.planets[0]}
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="255.25" y="320.1">
                          
                        </Text>

                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="255.25" y="335.1">
                          
                        </Text>


                    </G>

                    {/* fourth trangle */}

                    <G x="-165" y="-125">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="310.25" y="292.1">
                        {data?.chart[3]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="249.25" y="295.1">
                        {data?.chart[3]?.planets[0]}
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="249.25" y="320.1">
                            
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="249.25" y="340.1">
                          
                        </Text>
                    </G>

                    {/* fifth trangle */}

                    <G x="-235" y="-70">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="305.25" y="315.1">
                        {data?.chart[4]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="blue" fontWeight={"500"} fontSize="12" x="257.25" y="295.1">
                        {data?.chart[4]?.planets[0]}
                        </Text>
                        <Text color="black" fill="pink" fontWeight={"500"} fontSize="12" x="257.25" y="320.1">
                         
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="257.25" y="340.1">
                         
                        </Text>
                    </G>

                    {/* sixth trangle */}
                    <G x="-165">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="252.25" y="261.1">
                        {data?.chart[5]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="orange" fontWeight={"500"} fontSize="12" x="249.25" y="290.1">
                        {data?.chart[5]?.planets[0]}
                        </Text>
                        <Text color="black" fill={colors.background_theme2} fontWeight={"500"} fontSize="12" x="249.25" y="310.1">
                            
                        </Text>
                        <Text color="black" fill={colors.background_theme2} fontWeight={"500"} fontSize="12" x="210.25" y="310.1">
                           
                        </Text>
                    </G>

                    {/* seventh trangle */}
                    <G x="-82" y="-50">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="255.25" y="235.1">
                        {data?.chart[6]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="skyblue" fontWeight={"500"} fontSize="12" x="249.25" y="295.1">
                        {data?.chart[6]?.planets[0]}
                        </Text>
                        <Text color="black" fill="orange" fontWeight={"500"} fontSize="12" x="249.25" y="320.1">
                          
                        </Text>
                        <Text color="black" fill="red" fontWeight={"500"} fontSize="12" x="249.25" y="340.1">
                         
                        </Text>
                    </G>

                    {/* eigth trangle */}
                    <G>
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="255.25" y="261.1">
                        {data?.chart[7]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="249.25" y="285.1">
                        {data?.chart[7]?.planets[0]}
                        </Text>
                        <Text color="black" fill="red" fontWeight={"500"} fontSize="12" x="249.25" y="305.1">
                          
                        </Text>
                        <Text color="black" fill="purple" fontWeight={"500"} fontSize="12" x="210.25" y="305.1">
                           
                        </Text>
                    </G>

                    {/* ninth trangle */}
                    <G x="70" y="-60">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="200.25" y="305.1">
                        {data?.chart[8]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="red" fontWeight={"500"} fontSize="12" x="230.25" y="295.1">
                        {data?.chart[8]?.planets[0]}
                        </Text>
                        <Text color="black" fill="orange" fontWeight={"500"} fontSize="12" x="230.25" y="320.1">
                       
                        </Text>
                        <Text color="black" fill="orange" fontWeight={"500"} fontSize="12" x="230.25" y="338.1">
                           
                        </Text>
                    </G>

                    {/* tenth trangle */}
                    <G x="0" y="-125">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="190.25" y="292.1">
                        {data?.chart[9]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="249.25" y="295.1">
                        {data?.chart[9]?.planets[0]}
                        </Text>
                        <Text color="black" fill="red" fontWeight={"500"} fontSize="12" x="249.25" y="320.1">
                           
                        </Text>
                        <Text color="black" fill="red" fontWeight={"500"} fontSize="12" x="215.25" y="320.1">
                         
                        </Text>
                    </G>

                    {/* elevanth trangle */}
                    <G x="70" y="-215">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="200.25" y="305.1">
                        {data?.chart[10]?.rashiIndex}
                        </Text>
                        <Text color="black" fill="orange" fontWeight={"500"} fontSize="12" x="228.25" y="295.1">
                        {data?.chart[10]?.planets[0]}
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="228.25" y="320.1">
                           
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="235.25" y="340.1">
                          
                        </Text>
                    </G>

                    {/* twelth trangle */}

                    <G x="5" y="-235">
                        <Text fill="black" fontWeight={"500"} fontSize="11" x="245.25" y="310.1">
                        {data?.chart[11]?.rashiIndex}
                        </Text>
                        <Text color="black" fill={colors.background_theme2} fontWeight={"500"} fontSize="12" x="249.25" y="289.1">
                        {data?.chart[11]?.planets[0]}
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="249.25" y="270.1">
                           
                        </Text>
                        <Text color="black" fill="green" fontWeight={"500"} fontSize="12" x="210.25" y="270.1">
                           
                        </Text>
                    </G>
                    <Path d="M340,165L340,320L257.5,242.5" fill="none" stroke="orange" />
                </G>
            </Svg>}
        </View>
    );
};

export default AstakCharts;
