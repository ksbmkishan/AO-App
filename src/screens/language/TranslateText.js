import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "./i18n";
import { language_key } from "../../config/constants";

const BASE_URL = "https://translation.googleapis.com/language/translate/v2";

const TranslateText = ({ title }) => {
  const [translatedText, setTranslatedText] = useState(title);

  // console.log('i18n.language  ',i18n.language);

  useEffect(() => {
    let isMounted = true;

    const fetchTranslation = async () => {


      try {
        if(i18n.language != 'en') {
          const response = await axios.post(BASE_URL, null, {
            params: {
              q: title,
              target: i18n.language,
              key: language_key,
              source:'en'
            },
          });
  
          const translated = response.data.data.translations[0].translatedText;
          if (isMounted) {
            setTranslatedText(translated);
          }
        } else {
          setTranslatedText(title)
        }
        
      } catch (error) {
        console.error("Translation Error:", error);
        setTranslatedText(title); // Fallback to original text
      }
    };

    if (typeof title === "string" && title.trim() !== "") {
      fetchTranslation();
    }

    return () => {
      isMounted = false;
    };
  }, [title, i18n.language]);

  return <>{translatedText}</>;
};

export default TranslateText;