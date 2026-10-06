export interface DiseaseDetails {
  severity: "Low" | "Moderate" | "High" | "Critical";
  scientific_name: string;
  cause: string;
  symptoms: string[];
  organic_treatment: string[];
  chemical_treatment: string[];
  recommended_pesticide: string;
  dosage: string;
  prevention: string[];
}

export type DiseaseKnowledge = Record<"en" | "hi" | "te", DiseaseDetails>;

function generateStandard(crop: string, disease: string): DiseaseKnowledge {
  const isHealthy = disease.toLowerCase().includes("healthy");
  const d_en = disease.replace(/_/g, ' ');
  return {
    en: {
      severity: isHealthy ? "Low" : "Moderate",
      scientific_name: isHealthy ? `${crop} (Healthy)` : `Pathogen causing ${d_en}`,
      cause: isHealthy ? "No disease detected. Plant appears healthy." : "Infection detected by CropSense AI model.",
      symptoms: isHealthy ? ["Leaves are green and intact."] : [`Visible leaf damage or discoloration typical of ${d_en}.`],
      organic_treatment: isHealthy ? ["Continue regular maintenance."] : ["Remove affected plant parts.", "Improve air circulation."],
      chemical_treatment: isHealthy ? ["None required."] : ["Consult local agricultural guidance before applying treatments."],
      recommended_pesticide: isHealthy ? "N/A" : "Locally approved treatment",
      dosage: isHealthy ? "N/A" : "Follow product label instructions.",
      prevention: isHealthy ? ["Monitor regularly."] : ["Maintain proper crop spacing.", "Sanitize tools."],
    },
    hi: {
      severity: isHealthy ? "Low" : "Moderate",
      scientific_name: isHealthy ? `${crop} (स्वस्थ)` : `${d_en} रोगज़नक़`,
      cause: isHealthy ? "कोई बीमारी नहीं। पौधा स्वस्थ है।" : "CropSense AI द्वारा संक्रमण का पता चला।",
      symptoms: isHealthy ? ["पत्तियां हरी और बरकरार हैं।"] : [`${d_en} के विशिष्ट दृश्यमान लक्षण।`],
      organic_treatment: isHealthy ? ["नियमित देखभाल जारी रखें।"] : ["प्रभावित हिस्सों को हटा दें।", "हवा का संचार सुधारें।"],
      chemical_treatment: isHealthy ? ["कोई आवश्यकता नहीं।"] : ["उपचार से पहले स्थानीय कृषि मार्गदर्शन लें।"],
      recommended_pesticide: isHealthy ? "लागू नहीं" : "स्थानीय रूप से अनुमोदित उपचार",
      dosage: isHealthy ? "लागू नहीं" : "उत्पाद लेबल निर्देशों का पालन करें।",
      prevention: isHealthy ? ["नियमित निगरानी करें।"] : ["उचित अंतर बनाए रखें।", "उपकरणों को साफ करें।"],
    },
    te: {
      severity: isHealthy ? "Low" : "Moderate",
      scientific_name: isHealthy ? `${crop} (ఆరోగ్యకరమైనది)` : `${d_en} వ్యాధికారకం`,
      cause: isHealthy ? "ఎలాంటి వ్యాధి లేదు. మొక్క ఆరోగ్యంగా ఉంది." : "క్రాప్‌సెన్స్ AI ద్వారా సంక్రమణ గుర్తించబడింది.",
      symptoms: isHealthy ? ["ఆకులు ఆకుపచ్చగా ఉన్నాయి."] : [`${d_en} యొక్క సాధారణ కనిపించే లక్షణాలు.`],
      organic_treatment: isHealthy ? ["సాధారణ నిర్వహణను కొనసాగించండి."] : ["ప్రభావిత భాగాలను తొలగించండి.", "గాలి ప్రసరణను మెరుగుపరచండి."],
      chemical_treatment: isHealthy ? ["అవసరం లేదు."] : ["చికిత్సకు ముందు స్థానిక వ్యవసాయ మార్గదర్శకాలను సంప్రదించండి."],
      recommended_pesticide: isHealthy ? "వర్తించదు" : "స్థానికంగా ఆమోదించబడిన చికిత్స",
      dosage: isHealthy ? "వర్తించదు" : "ఉత్పత్తి లేబుల్ సూచనలను అనుసరించండి.",
      prevention: isHealthy ? ["క్రమం తప్పకుండా పర్యవేక్షించండి."] : ["సరైన అంతరాన్ని నిర్వహించండి.", "పనిముట్లను శుభ్రపరచండి."],
    }
  };
}

export const diseaseKnowledgeDB: Record<string, DiseaseKnowledge> = {
  "Apple___Black_rot": {
    en: {
      severity: "High",
      scientific_name: "Botryosphaeria obtusa",
      cause: "Fungal infection affecting leaves, fruit, and bark.",
      symptoms: ["Purple spots on leaves that turn brown.", "Rotting of fruit with concentric rings.", "Cankers on branches."],
      organic_treatment: ["Prune and destroy infected branches and mummified fruit.", "Improve air circulation."],
      chemical_treatment: ["Apply fungicides containing Captan or Myclobutanil.", "Follow local agricultural guidance and product labels."],
      recommended_pesticide: "Captan (Fungicide)",
      dosage: "Follow product label instructions.",
      prevention: ["Remove dead wood.", "Avoid overhead irrigation.", "Apply dormant sprays."],
    },
    hi: {
      severity: "High",
      scientific_name: "बोट्रियोस्फेरिया ओबटुसा (Botryosphaeria obtusa)",
      cause: "फंगल संक्रमण जो पत्तियों, फलों और छाल को प्रभावित करता है।",
      symptoms: ["पत्तियों पर बैंगनी धब्बे जो भूरे हो जाते हैं।", "फलों का सड़ना।", "शाखाओं पर नासूर।"],
      organic_treatment: ["संक्रमित शाखाओं और फलों को काटें और नष्ट करें।", "हवा का संचार सुधारें।"],
      chemical_treatment: ["कैप्टन या माइक्लोबुटानिल युक्त कवकनाशी (Fungicides) लागू करें।", "स्थानीय कृषि मार्गदर्शन का पालन करें।"],
      recommended_pesticide: "कैप्टन (कवकनाशी)",
      dosage: "उत्पाद लेबल निर्देशों का पालन करें।",
      prevention: ["सूखी लकड़ी हटा दें।", "ऊपर से सिंचाई करने से बचें।", "सुप्त स्प्रे लागू करें।"],
    },
    te: {
      severity: "High",
      scientific_name: "బోట్రియోస్ఫేరియా ఒబ్టుసా (Botryosphaeria obtusa)",
      cause: "ఆకులు, పండ్లు మరియు బెరడును ప్రభావితం చేసే శిలీంధ్ర సంక్రమణం.",
      symptoms: ["ఆకులపై ఊదా రంగు మచ్చలు గోధుమ రంగులోకి మారుతాయి.", "పండ్లు కుళ్ళిపోవడం.", "కొమ్మలపై పుండ్లు."],
      organic_treatment: ["సోకిన కొమ్మలు మరియు పండ్లను కత్తిరించి నాశనం చేయండి.", "గాలి ప్రసరణను మెరుగుపరచండి."],
      chemical_treatment: ["కాప్టాన్ లేదా మైక్లోబుటానిల్ కలిగిన శిలీంద్రనాశకాలను వర్తించండి.", "స్థానిక వ్యవసాయ మార్గదర్శకాలను అనుసరించండి."],
      recommended_pesticide: "కాప్టాన్ (శిలీంద్రనాశకం)",
      dosage: "ఉత్పత్తి లేబుల్ సూచనలను అనుసరించండి.",
      prevention: ["చనిపోయిన కలపను తొలగించండి.", "ఓవర్ హెడ్ నీటిపారుదలని నివారించండి."],
    }
  },
  "Apple___Apple_scab": generateStandard("Apple", "Apple_scab"),
  "Apple___Cedar_apple_rust": generateStandard("Apple", "Cedar_apple_rust"),
  "Apple___healthy": generateStandard("Apple", "healthy"),
  "Blueberry___healthy": generateStandard("Blueberry", "healthy"),
  "Cherry_(including_sour)___Powdery_mildew": generateStandard("Cherry", "Powdery_mildew"),
  "Cherry_(including_sour)___healthy": generateStandard("Cherry", "healthy"),
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": generateStandard("Corn", "Cercospora_leaf_spot Gray_leaf_spot"),
  "Corn_(maize)___Common_rust_": generateStandard("Corn", "Common_rust_"),
  "Corn_(maize)___Northern_Leaf_Blight": generateStandard("Corn", "Northern_Leaf_Blight"),
  "Corn_(maize)___healthy": generateStandard("Corn", "healthy"),
  "Grape___Black_rot": generateStandard("Grape", "Black_rot"),
  "Grape___Esca_(Black_Measles)": generateStandard("Grape", "Esca_(Black_Measles)"),
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": generateStandard("Grape", "Leaf_blight_(Isariopsis_Leaf_Spot)"),
  "Grape___healthy": generateStandard("Grape", "healthy"),
  "Orange___Haunglongbing_(Citrus_greening)": generateStandard("Orange", "Haunglongbing_(Citrus_greening)"),
  "Peach___Bacterial_spot": generateStandard("Peach", "Bacterial_spot"),
  "Peach___healthy": generateStandard("Peach", "healthy"),
  "Pepper,_bell___Bacterial_spot": generateStandard("Pepper", "Bacterial_spot"),
  "Pepper,_bell___healthy": generateStandard("Pepper", "healthy"),
  "Potato___Early_blight": generateStandard("Potato", "Early_blight"),
  "Potato___Late_blight": generateStandard("Potato", "Late_blight"),
  "Potato___healthy": generateStandard("Potato", "healthy"),
  "Raspberry___healthy": generateStandard("Raspberry", "healthy"),
  "Soybean___healthy": generateStandard("Soybean", "healthy"),
  "Squash___Powdery_mildew": generateStandard("Squash", "Powdery_mildew"),
  "Strawberry___Leaf_scorch": generateStandard("Strawberry", "Leaf_scorch"),
  "Strawberry___healthy": generateStandard("Strawberry", "healthy"),
  "Tomato___Bacterial_spot": generateStandard("Tomato", "Bacterial_spot"),
  "Tomato___Early_blight": generateStandard("Tomato", "Early_blight"),
  "Tomato___Late_blight": generateStandard("Tomato", "Late_blight"),
  "Tomato___Leaf_Mold": generateStandard("Tomato", "Leaf_Mold"),
  "Tomato___Septoria_leaf_spot": generateStandard("Tomato", "Septoria_leaf_spot"),
  "Tomato___Spider_mites Two-spotted_spider_mite": generateStandard("Tomato", "Spider_mites"),
  "Tomato___Target_Spot": generateStandard("Tomato", "Target_Spot"),
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": generateStandard("Tomato", "Tomato_Yellow_Leaf_Curl_Virus"),
  "Tomato___Tomato_mosaic_virus": generateStandard("Tomato", "Tomato_mosaic_virus"),
  "Tomato___healthy": generateStandard("Tomato", "healthy")
};

export const fallbackKnowledge: DiseaseKnowledge = {
  en: {
    severity: "Moderate",
    scientific_name: "Unknown Pathogen",
    cause: "Condition detected by CropSense AI model but specific details are unavailable.",
    symptoms: ["Visible symptoms detected.", "Consult local agricultural guidance for confirmation."],
    organic_treatment: ["Remove severely affected plant material.", "Maintain good airflow around plants."],
    chemical_treatment: ["Consult local agricultural guidance before applying pesticides."],
    recommended_pesticide: "Use only locally approved treatment.",
    dosage: "Follow the product label recommendations.",
    prevention: ["Remove infected plant material.", "Avoid excessive leaf wetness."],
  },
  hi: {
    severity: "Moderate",
    scientific_name: "अज्ञात रोगज़नक़",
    cause: "CropSense AI द्वारा स्थिति का पता चला लेकिन विवरण अनुपलब्ध हैं।",
    symptoms: ["दिखाई देने वाले लक्षण।", "पुष्टि के लिए स्थानीय कृषि मार्गदर्शन लें।"],
    organic_treatment: ["बुरी तरह प्रभावित पौधों को हटा दें।", "हवा का संचार अच्छा रखें।"],
    chemical_treatment: ["कीटनाशकों के प्रयोग से पहले स्थानीय कृषि मार्गदर्शन लें।"],
    recommended_pesticide: "स्थानीय रूप से अनुमोदित उपचार का ही उपयोग करें।",
    dosage: "उत्पाद लेबल की सिफारिशों का पालन करें।",
    prevention: ["संक्रमित पौधों को हटा दें।", "पत्तियों को ज्यादा गीला न होने दें।"],
  },
  te: {
    severity: "Moderate",
    scientific_name: "తెలియని వ్యాధికారకం",
    cause: "స్థితి గుర్తించబడింది కానీ నిర్దిష్ట వివరాలు అందుబాటులో లేవు.",
    symptoms: ["కనిపించే లక్షణాలు.", "ధృవీకరణ కోసం స్థానిక వ్యవసాయ మార్గదర్శకాలను సంప్రదించండి."],
    organic_treatment: ["బాగా ప్రభావితమైన మొక్కల సామగ్రిని తొలగించండి.", "మొక్కల చుట్టూ మంచి గాలి ప్రసరణను నిర్వహించండి."],
    chemical_treatment: ["పురుగుమందులను వర్తించే ముందు స్థానిక వ్యవసాయ మార్గదర్శకాలను సంప్రదించండి."],
    recommended_pesticide: "స్థానికంగా ఆమోదించబడిన చికిత్సను మాత్రమే ఉపయోగించండి.",
    dosage: "ఉత్పత్తి లేబుల్ సిఫార్సులను అనుసరించండి.",
    prevention: ["సోకిన మొక్కల సామగ్రిని తొలగించండి.", "ఆకులు ఎక్కువగా తడవకుండా నివారించండి."],
  }
};
