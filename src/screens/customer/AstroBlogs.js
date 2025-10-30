import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import {api_url, base_url, blog, colors, fonts} from '../../config/Constants1';
import {useEffect} from 'react';
import {useState} from 'react';
import MyLoader from '../../components/MyLoader2';
import moment from 'moment/moment';
import {useTranslation} from 'react-i18next';
import * as BlogActions from '../../redux/actions/BlogActions';
import {connect} from 'react-redux';
import {Fonts, Sizes} from '../../assets/style';
import {FontsStyle, img_url} from '../../config/constants';
import MyHeader from '../../components/MyHeader';
import {Colors, RESPONSIVE_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SvgOrImage from '../../components/SvgOrImage';
import TranslateText from '../language/TranslateText';
const {width, height} = Dimensions.get('screen');

const AstroBlogs = ({navigation, dispatch, astroBlogData, astroBlogCategory}) => {
  // console.log(astroBlogData,'astroBlogCategory');
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [search, setSearch] = useState('');
  const [FilteredData,setFilteredData] = useState(astroBlogData);
  const [selected,setSelected] = useState(0);

  console.log('se;ece',selected);

  useEffect(() => {
    setFilteredData(astroBlogData);
  },[astroBlogData]);
 

  useEffect(() => {
    dispatch(BlogActions.getAstroBlogs());
    dispatch(BlogActions.getAstroBlogsCategory());
  }, [dispatch]);

  const searchFilterFunction = text => {
    setSearch(text);
  
    const filteredData = astroBlogData.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
  
    setFilteredData(filteredData); // Assuming you have a state to store the filtered data
  };

  const selectedCategoryFilterFunction = text => {
    setSelected(text);
    if(text === 'All'){
      setFilteredData(astroBlogData);
    }else{
      const filteredData = astroBlogData.filter(item =>
        item?.blogCategoryId?.blog_category?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };


  console.log('FilteredData',FilteredData?.length);
  return (
    <View style={{flex: 1, backgroundColor: 'lightgray'}}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <MyHeader title={'Blogs'} navigation={navigation} />

      <MyLoader isVisible={isLoading} />

      <View style={{flex: 1, padding: Sizes.fixPadding, gap: Sizes.fixPadding}}>
        <View style={{borderWidth: 0.6, borderRadius: 8,paddingHorizontal:4,backgroundColor:'#D56A14',borderColor:'white'}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:Sizes.fixPadding,flex:0}}>
          <Ionicons name = 'search-outline' color = 'black' size={18}/>
          <TextInput
            placeholder={t("Search by Title")}
            style={{...Fonts.PoppinsRegular,flex:1}}
            cursorColor={'black'}
            onChangeText={text => searchFilterFunction(text)}
           
          />
          </View>
        </View>
        {astroBlogCategory && Logos()}
        <FlatList
          ListHeaderComponent={<>{astroBlogData && listInfo()}</>}
          contentContainerStyle={{paddingHorizontal: Sizes.fixPadding}}
        />
      </View>
    </View>
  );



  function listInfo() {
    const renderItem = ({item, index}) => {
      // console.log(item, 'blogs');

      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('blogDetailes', {
              blogData: item,
            })
          }
          style={{
            flexDirection: 'row',
            backgroundColor: colors.background_theme1,
            borderRadius: 10,
            marginBottom: Sizes.fixPadding,
            padding:Sizes.fixPadding
          }}>
          {/* <Image
            source={{uri: img_url + item?.image}}
            style={{
              width: width * 0.2,
              height: width * 0.2,
              objectFit:'fill'
            }}

          /> */}
          <SvgOrImage 
          uri={ item?.image}
          style={{
              width: width * 0.2,
              height: width * 0.2,
              objectFit:'fill'
            }}
          />
          <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 5}}>
            <Text
              allowFontScaling={false}
              style={{
                ...FontsStyle.font,
                color: colors.black_color8,
              }}>
              <TranslateText title={item.title} />
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                ...FontsStyle.font,
                color: colors.black_color5,
              }}>
              {t("Posted")}: {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 14,
                color: colors.black_color6,
                fontFamily: fonts.medium,
              }}>
              {/* Category: {item.blogCategory} */}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={FilteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          ListEmptyComponent={
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: RESPONSIVE_HEIGHT(20)}}>
            <Text>{t("No blogs found")}</Text>
          </View>}
        />
      </View>
    );
  }

  function Logos() {

    const AllData = [
      {
        __v: -1,
        _id: "67efbbde691e1c6a5434",
        blog_category: "All",
        createdAt: "2025-04-04T11:00:46.967Z",
        updatedAt: "2025-04-04T11:42:05.218Z",
      },
      ...astroBlogCategory
    ];
    
    return (
      <View style={{paddingHorizontal: SCREEN_WIDTH * 0.02}}>
        <FlatList 
        horizontal
        data={AllData}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={{ 
             paddingHorizontal: Sizes.fixPadding,
              borderColor: colors.black_color6,
              borderWidth: 1,
              borderRadius: Sizes.fixPadding * 10,
              backgroundColor: selected == index ? colors.background_theme2:'white',
              marginHorizontal: Sizes.fixPadding,
              padding:5
            }}
            onPress={() => {
              selectedCategoryFilterFunction(item?.blog_category),
              setSelected(index)
            }
              
            }>
             
              <Text
                allowFontScaling={false}
                style={{
                  color:selected == index ? 'white' : colors.black_color6,
                  fontFamily: fonts.medium,
                  marginTop: 5,
                }}>
                <TranslateText title={item.blog_category} />
              </Text>

            </TouchableOpacity>
        )}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  astroBlogData: state.blogs.astroBlogData,
  astroBlogCategory: state.blogs.astroBlogCategory
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(AstroBlogs);

const styles = StyleSheet.create({
  noContentContainer: {
    flex: 0,
    height: height * 0.15,
    backgroundColor: colors.background_theme1,
    borderRadius: 10,
    borderColor: colors.black_color6,
    borderWidth: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...FontsStyle.font
  },
  socialIcon: {
    width: width * 0.16,
    height: width * 0.16,
    resizeMode: 'cover',
    borderRadius: 1000,
  },
});
