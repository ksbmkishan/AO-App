import {View} from 'react-native';
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

const ShowSvg = ({data}) => {
  console.log(data);
  return (
    <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
      {data && (
        <Svg width="350" height="330">
          <G rotation="0" origin="100, 50">
            <Path
              d="M10 10L175 10L92.5 87.5L10 10"
              fill="none"
              stroke="orange"
            />
            <Path
              d="M175 10L340 10L257.5 87.5L175 10"
              fill="none"
              stroke="orange"
            />
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
            <Path
              d="M257.5,242.5L340,320L175,320"
              fill="none"
              stroke="orange"
            />
            <Path
              d="M340,165L340,320L257.5,242.5"
              fill="none"
              stroke="orange"
            />
            {/* First trangle */}

            <G x="-82" y="-210">
              {/* Show house number */}

              <Text fill="black" fontSize="12" x="249.25" y="361.1">
                {data[0]?.rashiIndex}
              </Text>

              {/* Show planets dynamically */}
              {data[0]?.planets?.map((planet, index) => (
                <Text
                  key={index}
                  fill="gold"
                  fontSize="12"
                  fontWeight={'600'}
                  x={249.25}
                  y={261.1 + index * 15}>
                  {planet.name}
                </Text>
              ))}
            </G>

            {/* second trangle */}

            <G x="-165" y="-235">
              <Text fill="black" fontSize="12" x="249.25" y="280.1">
                {data[1]?.rashiIndex}
              </Text>

              {data[1]?.planets?.map((planet, index) => (
                <Text
                  key={index}
                  fill="red"
                  fontSize="12"
                  x={249.25}
                  y={261.1 + index * 15}>
                  {planet.name}
                </Text>
              ))}

              <Text fill="red" fontSize="12" x="249.25" y="276.1">
                {data[1]?.planet_small?.includes('Su ') ? 'Su' : null}
              </Text>
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

              <Text fill="black" fontSize="12" x="269.25" y="260.1">
                {data[1]?.planet_small?.includes('Ju ') ? 'Ju' : null}
              </Text>
              <Text fill="black" fontSize="12" x="289.25" y="260.1">
                {data[1]?.planet_small?.includes('Ra ') ? 'Ra' : null}
              </Text>
            </G>

            {/* third trangle */}

            <G x="-235" y="-210">
              <Text fill="black" fontSize="12" x="289.25" y="315.1">
                {data[2]?.rashiIndex}
              </Text>

              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[2]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[2]?.planet_small?.includes('Su ') ? 'Su' : null}
              </Text>
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
            </G>

            {/* fourth trangle */}

            <G x="-165" y="-125">
              <Text fill="black" fontSize="12" x="289.25" y="315.1">
                {data[3]?.rashiIndex}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[3]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[3]?.planet_small?.includes('Su ') ? 'Su' : null}
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
            </G>

            {/* fifth trangle */}

            <G x="-235" y="-70">
              <Text fill="black" fontSize="12" x="289.25" y="315.1">
                {data[4]?.rashiIndex}
              </Text>

              {data[4]?.planets?.map((planet, index) => (
                <Text
                  key={index}
                  fill="red"
                  fontSize="12"
                  x={249.25}
                  y={261.1 + index * 15}>
                  {planet.name}
                </Text>
              ))}

              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[4]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[4]?.planet_small?.includes('Su ') ? 'Su' : null}
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
            </G>

            {/* sixth trangle */}
            <G x="-165">
              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[5]?.rashiIndex}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[5]?.planet_small?.includes('Ma ') ? 'Ma' : null}
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
              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[6]?.rashiIndex}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[6]?.planet_small?.includes('Ma ') ? 'Ma' : null}
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
              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[7]?.rashiIndex}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[7]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
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
              <Text fill="black" fontSize="12" x="209.25" y="315.1">
                {data[8]?.rashiIndex}
              </Text>

             

              <Text fill="gold" fontSize="12" x={224.25} y={276.1}>
                {data[8]?.planets?.find(p => p.name === 'Su') ? 'Su' : null}
              </Text>

              <Text fill="green" fontSize="12" x={249.25} y={295.1}>
                {data[8]?.planets?.find(p => p.name === 'Me') ? 'Me' : null}
              </Text>

              

              <Text fill="red" fontSize="12" x={249.25} y={315.1}>
                {data[8]?.planets?.find(p => p.name === 'Pl') ? 'Pl' : null}
              </Text>

              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[8]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[8]?.planet_small?.includes('Su ') ? 'Su' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="295.1">
                {data[8]?.planet_small?.includes('Me ') ? 'Me' : null}
              </Text>
              <Text fill="black" fontSize="12" x="229.25" y="295.1">
                {data[8]?.planet_small?.includes('Ve ') ? 'Ve' : null}
              </Text>
              <Text fill="black" fontSize="12" x="229.25" y="315.1">
                {data[8]?.planet_small?.includes('Ke ') ? 'Ke' : null}
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

            {data[9]?.planets?.map((planet, index) => (
                <Text
                  key={index}
                  fill="red"
                  fontSize="12"
                  x={249.25}
                  y={261.1 + index * 15}>
                  {planet.name}
                </Text>
              ))}
              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[9]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[9]?.planet_small?.includes('Su ') ? 'Su' : null}
              </Text>
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
                {data[9]?.rashiIndex}
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
            <Text fill="black" fontSize="12" x="209.25" y="315.1">
                {data[10]?.rashiIndex}
              </Text>

              <Text fill="gold" fontSize="12" x={224.25} y={276.1}>
                {data[10]?.planets?.find(p => p.name === 'Ve') ? 'Ve' : null}
              </Text>

              <Text fill="green" fontSize="12" x={249.25} y={295.1}>
                {data[10]?.planets?.find(p => p.name === 'Ra') ? 'Ra' : null}
              </Text>

              

              <Text fill="red" fontSize="12" x={249.25} y={315.1}>
                {data[10]?.planets?.find(p => p.name === 'Ne') ? 'Ne' : null}
              </Text>

              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[10]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[10]?.planet_small?.includes('Su ') ? 'Su' : null}
              </Text>
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
                {data[10]?.rashiIndex}
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
              <Text fill="black" fontSize="12" x="249.25" y="261.1">
                {data[11]?.planet_small?.includes('Ma ') ? 'Ma' : null}
              </Text>
              <Text fill="black" fontSize="12" x="249.25" y="276.1">
                {data[11]?.planet_small?.includes('Su ') ? 'Su' : null}
              </Text>
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
                {data[11]?.rashiIndex}
              </Text>
              <Text fill="black" fontSize="12" x="269.25" y="260.1">
                {data[11]?.planet_small?.includes('Ju ') ? 'Ju' : null}
              </Text>
              <Text fill="black" fontSize="12" x="289.25" y="260.1">
                {data[11]?.planet_small?.includes('Ra ') ? 'Ra' : null}
              </Text>
            </G>

            <Path
              d="M340,165L340,320L257.5,242.5"
              fill="none"
              stroke="orange"
            />
          </G>
        </Svg>
      )}
    </View>
  );
};

export default ShowSvg;
