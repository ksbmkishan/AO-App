import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import i18n from "./i18n";
import { language_key } from "../../config/constants";

const BASE_URL = "https://translation.googleapis.com/language/translate/v2";

export const Translated = async(title) => {
  
    console.log('tile ')
      try {
        if (i18n.language!='en'){
          const response = await axios.post(BASE_URL, null, {
            params: {
              q: title,
              target: i18n.language,
              key: language_key,
              source:'en'
            },
          });
          const translated = response.data.data.translations[0].translatedText;
          console.log('tranlated ', translated)
          return translated;
        }

        return title;
        
       

       
        
      } catch (error) {
        console.error("Translation Error:", error);
       return title;
      }
};
