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

const KpCupsSvg = ({ data }) => {

    console.log("jikiio", data)

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
                        <Text color="black" fill="black" fontSize="12" x="253" y="350">
                            {data?.chart[0]?.house}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="240" y="325">
                            {data?.chart[0]?.rashi}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="249.25" y="295.1">
                            {data?.chart[0]?.planets[0]?.name}
                        </Text>
                        {data?.chart[0]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={249.25} d
                                y={295.1 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}
                        {/* {data?.chart[0]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={255.25} d
                                y={276.1 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}
                            </Text>
                        ))} */}
                        <Text color="black" fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[0]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[0]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[0]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[0]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text color="black" fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[0]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* second trangle */}

                    <G x="-165" y="-235">
                        <Text fill="black" fontSize="12" x="253.25" y="310.1">
                            {data?.chart[1]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="240.25" y="295.1">
                            {data?.chart[0]?.rashi}
                        </Text>


                        {data?.chart[1]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={230.25} d
                                y={258.25 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}


                        {/* {data?.chart[1]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={250.25} d
                                y={258.25 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}
                            </Text>
                        ))} */}

                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[1]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[1]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[1]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="260.1">
                            {data[1]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="260.1">
                            {data[1]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[1]?.sign}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="260.1">
                            {data[1]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="260.1">
                            {data[1]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* third trangle */}

                    <G x="-235" y="-210">
                        <Text fill="black" fontSize="12" x="300.25" y="299.1">
                            {data?.chart[2]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[2]?.rashi}
                        </Text>
                        {data?.chart[2]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={230.25} d
                                y={258.25 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}

                        {/* {data?.chart[2]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={230.25} d
                                y={258.25 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}
                            </Text>
                        ))} */}


                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[2]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[2]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="335.1">
                            {data[2]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="355.1">
                            {data[2]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="335.1">
                            {data[2]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[2]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[2]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[2]?.sign}
                        </Text>
                    </G>

                    {/* fourth trangle */}

                    <G x="-165" y="-125">
                        <Text fill="black" fontSize="12" x="310.25" y="292.1">
                            {data?.chart[3]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[3]?.rashi}

                            {data?.chart[4]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={230.25} d
                                    y={258.25 + index * 20}
                                    color="black"
                                >
                                    {planet.name}
                                </Text>
                            ))}
                            {/* {data?.chart[4]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={250.25} d
                                    y={258.25 + index * 20}
                                    color="black"
                                >
                                    {planet.degree?.deg}°
                                </Text>
                            ))} */}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[3]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[3]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[3]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[3]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[3]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[3]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[3]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[3]?.sign}
                        </Text>
                    </G>

                    {/* fifth trangle */}

                    <G x="-235" y="-70">
                        <Text fill="black" fontSize="12" x="305.25" y="315.1">
                            {data?.chart[4]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[4]?.rashi}

                            {data?.chart[4]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12 "
                                    x={260.25} d
                                    y={300.25 + index * 20}
                                    color="black"
                                >
                                    {planet.name}
                                </Text>
                            ))}
                            {/* {data?.chart[4]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={275.25} d
                                    y={300.25 + index * 20}
                                    color="black"
                                >
                                    {planet.degree?.deg}°
                                </Text>
                            ))} */}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[4]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[4]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="335.1">
                            {data[4]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="355.1">
                            {data[4]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="335.1">
                            {data[4]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[4]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[4]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[4]?.sign}
                        </Text>
                    </G>

                    {/* sixth trangle */}
                    <G x="-165">
                        <Text fill="black" fontSize="12" x="252.25" y="261.1">
                            {data?.chart[5]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[5]?.rashi}


                            {data?.chart[5]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={230.25} d
                                    y={258.25 + index * 20}
                                    color="black"
                                >
                                    {planet.name}
                                </Text>
                            ))}
                            {/* {data?.chart[5]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={230.25} d
                                    y={258.25 + index * 20}
                                    color="black"
                                >
                                    {planet.degree?.deg}
                                </Text>
                            ))} */}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[5]?.planet_small?.includes('Su ') ? 'Su' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[5]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[5]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[5]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[5]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[5]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[5]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[5]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* seventh trangle */}
                    <G x="-82" y="-50">
                        <Text fill="black" fontSize="12" x="255.25" y="235.1">
                            {data?.chart[6]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[6]?.rashi}


                            {data?.chart[6]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={230.25} d
                                    y={299.25 + index * 20}
                                    color="black"
                                >
                                    {planet.name}
                                </Text>
                            ))}
                            {/* {data?.chart[6]?.planets?.map((planet, index) => (
                                <Text
                                    key={index}
                                    fill="black"
                                    fontSize="12   "
                                    x={250.25} d
                                    y={299.25 + index * 20}
                                    color="black"
                                >
                                    {planet.degree?.deg}°
                                </Text>
                            ))} */}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[6]?.planet_small?.includes('Su ') ? 'Su' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[6]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[6]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[6]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[6]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[6]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[6]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[6]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* eigth trangle */}
                    <G>
                        <Text fill="black" fontSize="12" x="255.25" y="261.1">
                            {data?.chart[7]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[7]?.rashi}
                        </Text>
                        {data?.chart[7]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="11   "
                                x={240.25} d
                                y={273.25 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}
                        {/* {data?.chart[7]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={250.25} d
                                y={290.25 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}°
                            </Text>
                        ))} */}
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[7]?.planet_small?.includes('Su ') ? 'Su' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[7]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[7]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[7]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[7]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[7]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[7]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[7]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* ninth trangle */}
                    <G x="70" y="-60">
                        <Text fill="black" fontSize="12" x="200.25" y="305.1">
                            {data?.chart[8]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="235.25" y="330.1">
                        {data?.chart[8]?.rashi}

                        </Text>
                        {data?.chart[8]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={220.25} d
                                y={285.25 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}
                        {/* {data?.chart[8]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={240.25} d
                                y={285.25 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}°
                            </Text>
                        ))} */}
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[8]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[8]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[8]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[8]?.sign}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[8]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="335.1">
                            {data[8]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="355.1">
                            {data[8]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="335.1">
                            {data[8]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* tenth trangle */}
                    <G x="0" y="-125">
                        <Text fill="black" fontSize="12" x="190.25" y="292.1">
                            {data?.chart[9]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="276.1">
                            {data?.chart[9]?.rashi}

                        </Text>
                        {data?.chart[9]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={230.25} d
                                y={330.25 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}
                        {/* {data?.chart[9]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12   "
                                x={230.25} d
                                y={310.25 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}
                            </Text>
                        ))} */}
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[9]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[9]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[9]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[9]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[9]?.sign}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[9]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="315.1">
                            {data[9]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="315.1">
                            {data[9]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* elevanth trangle */}
                    <G x="70" y="-215">
                        <Text fill="black" fontSize="12" x="200.25" y="305.1">
                            {data?.chart[10]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="230.25" y="280.1">
                        {data?.chart[10]?.rashi}
                        </Text>
                        {data?.chart[10]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={249.25} d
                                y={295.1 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}
                        {/* {data?.chart[10]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={255.25} d
                                y={276.1 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}
                            </Text>
                        ))} */}
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[10]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[10]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="315.1">
                            {data[10]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="315.1">
                            {data[10]?.sign}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[10]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="335.1">
                            {data[10]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="355.1">
                            {data[10]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="335.1">
                            {data[10]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>

                    {/* twelth trangle */}

                    <G x="5" y="-235">
                        <Text fill="black" fontSize="12" x="245.25" y="310.1">
                            {data?.chart[11]?.house}
                        </Text>
                        <Text fill="black" fontSize="12" x="210.25" y="270.1">
                        {data?.chart[11]?.rashi}
                        </Text>
                        {data?.chart[11]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={249.25} d
                                y={280.1 + index * 20}
                                color="black"
                            >
                                {planet.name}
                            </Text>
                        ))}
                        {/* {data?.chart[11]?.planets?.map((planet, index) => (
                            <Text
                                key={index}
                                fill="black"
                                fontSize="12"
                                x={255.25} d
                                y={265.1 + index * 20}
                                color="black"
                            >
                                {planet.degree?.deg}°
                            </Text>
                        ))} */}
                        <Text fill="black" fontSize="12" x="249.25" y="295.1">
                            {data[11]?.planet_small?.includes('Me ') ? 'Me' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="295.1">
                            {data[11]?.planet_small?.includes('Ve ') ? 'Ve' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="295.1">
                            {data[11]?.planet_small?.includes('Ke ') ? 'Ke' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="229.25" y="260.1">
                            {data[11]?.planet_small?.includes('Mo ') ? 'Mo' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="209.25" y="260.1">
                            {data[11]?.planet_small?.includes('Sa ') ? 'Sa' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="249.25" y="315.1">
                            {data[11]?.sign}
                        </Text>
                        <Text fill="black" fontSize="12" x="269.25" y="260.1">
                            {data[11]?.planet_small?.includes('Ju ') ? 'Ju' : null}
                        </Text>
                        <Text fill="black" fontSize="12" x="289.25" y="260.1">
                            {data[11]?.planet_small?.includes('Ra ') ? 'Ra' : null}
                        </Text>
                    </G>
                    <Path d="M340,165L340,320L257.5,242.5" fill="none" stroke="orange" />
                </G>
            </Svg>}
        </View>
    );
};

export default KpCupsSvg;
