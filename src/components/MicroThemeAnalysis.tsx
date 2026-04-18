import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, BarChart3, Target, History, Globe, Shield, Zap, Leaf, Landmark, Users } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  name: string;
  count: number;
}

interface SubjectAnalysis {
  name: string;
  totalQuestions: number;
  totalThemes: number;
  icon: any;
  color: string;
  topics: Topic[];
}

const themeData: SubjectAnalysis[] = [
  {
    name: "Science and Technology",
    totalQuestions: 575,
    totalThemes: 14,
    icon: Zap,
    color: "blue",
    topics: [
      { name: "General Science", count: 405 },
      { name: "Human Health and Diseases", count: 153 },
      { name: "Biotechnology", count: 78 },
      { name: "Universe and Space Technology", count: 73 },
      { name: "Information and Communication Technology", count: 72 },
      { name: "Innovation in Energy Technology", count: 43 },
      { name: "Inheritance and Evolution", count: 34 },
      { name: "Unconventional and Alternate Energy Sources", count: 30 },
      { name: "Microbes in Human Welfare", count: 25 },
      { name: "Defence Technology", count: 23 },
      { name: "Human Reproduction", count: 11 },
      { name: "Reproductive Health", count: 9 },
      { name: "Nanotechnology", count: 6 },
      { name: "Miscellaneous", count: 3 },
    ]
  },
  {
    name: "Polity",
    totalQuestions: 387,
    totalThemes: 89,
    icon: Landmark,
    color: "indigo",
    topics: [
      { name: "Parliament", count: 98 },
      { name: "Federalism in Indian Constitution", count: 68 },
      { name: "Fundamental Rights", count: 61 },
      { name: "Lok Sabha - Lower House", count: 60 },
      { name: "Center State Relations", count: 58 },
      { name: "Executive System", count: 47 },
      { name: "Constitutional Amendments", count: 44 },
      { name: "President", count: 40 },
      { name: "Features of Constitution", count: 39 },
      { name: "Legislative System", count: 38 },
      { name: "Election System", count: 38 },
      { name: "Judiciary", count: 33 },
      { name: "Council of Ministers", count: 33 },
      { name: "Philosophy of the Constitution", count: 31 },
      { name: "Powers and Responsibilities of President", count: 31 },
      { name: "Rajya Sabha - Upper House", count: 29 },
      { name: "Division of Powers", count: 29 },
      { name: "Local governance", count: 27 },
      { name: "Powers privileges and Responsibilities of Lok Sabha", count: 27 },
      { name: "Directive Principles of State Policy (DPSP)", count: 26 },
      { name: "Judiciary Powers", count: 26 },
      { name: "Panchayati Raj System", count: 25 },
      { name: "Constitutional Bodies", count: 24 },
      { name: "Separation of Powers", count: 22 },
      { name: "Structure of Judicial System", count: 22 },
      { name: "Governor Power and Functions", count: 21 },
      { name: "Judicial Review", count: 21 },
      { name: "State Legislature", count: 21 },
      { name: "Jurisdiction of Courts", count: 20 },
      { name: "Welfare Schemes of Government for vulnerable groups", count: 19 },
      { name: "Prime Minister", count: 19 },
      { name: "Judiciary and Rights", count: 19 },
      { name: "Representation of People Act (RoPA)", count: 19 },
      { name: "Law Making Process", count: 17 },
      { name: "Right to Equality", count: 16 },
      { name: "Comparison of Indian Constitutional System with other Democracies", count: 16 },
      { name: "Powers privileges and Responsibilities of Rajya Sabha", count: 15 },
      { name: "Special Provisions for States", count: 14 },
      { name: "Money Bill", count: 13 },
      { name: "Preamble of the Constitution", count: 12 },
      { name: "Fundamental Duties", count: 12 },
      { name: "Parliamentary Committees", count: 12 },
      { name: "Judiciary Independence", count: 12 },
      { name: "Judiciary and Parliament", count: 11 },
      { name: "Finance Commission", count: 11 },
      { name: "Appointment and Removal of Judges", count: 11 },
      { name: "Right to Freedom", count: 11 },
      { name: "Budget", count: 11 },
      { name: "Emergency Provisions", count: 10 },
      { name: "Power and Responsibilities of Ministers", count: 10 },
      { name: "Judiciary Functions", count: 10 },
      { name: "Election Commission", count: 10 },
      { name: "Election to Lok Sabha", count: 9 },
      { name: "Bureaucracy", count: 9 },
      { name: "Municipalities", count: 9 },
      { name: "Basic Structure Doctrine (BSD)", count: 8 },
      { name: "Provisions of the Panchayats (Extension to Scheduled Areas) Act, PESA 1996", count: 8 },
      { name: "Cultural and Educational Rights", count: 8 },
      { name: "Procedure to amend the Constitution", count: 8 },
      { name: "Authority of Constitution", count: 6 },
      { name: "Tenth Schedule and Anti-defection Law", count: 6 },
      { name: "Alternative Dispute Resolution (ADR)", count: 6 },
      { name: "Powers and Responsibilities of Prime Minister", count: 6 },
      { name: "NALSA", count: 5 },
      { name: "Judiciary and Human Rights", count: 5 },
      { name: "Judiciary Responsibilities", count: 5 },
      { name: "Constituent Assembly", count: 5 },
      { name: "Tribunal System", count: 5 },
      { name: "Assent to Bill", count: 5 },
      { name: "Interstate Conflicts", count: 5 },
      { name: "State Finance Commission", count: 5 },
      { name: "Importance of Constitution", count: 5 },
      { name: "Conflicts in Indian Federal System", count: 4 },
      { name: "Power and Responsibilities of Vice President", count: 4 },
      { name: "Right to Constitutional Remedies", count: 4 },
      { name: "Right to Property", count: 4 },
      { name: "Lok Adalats", count: 4 },
      { name: "Comptroller and Auditor General of India (CAG)", count: 4 },
      { name: "Right to Freedom of Religion", count: 4 },
      { name: "Right against Exploitation", count: 4 },
      { name: "Attorney General of India (AG)", count: 4 },
      { name: "National Commission SC/ST/OBC", count: 4 },
      { name: "President Rule", count: 3 },
      { name: "State Legislatures", count: 3 },
      { name: "Writs", count: 3 },
      { name: "State Election Commission", count: 2 },
      { name: "Election to Rajya Sabha", count: 1 },
      { name: "Objectives Resolution", count: 1 },
      { name: "Miscellaneous", count: 4 },
    ]
  },
  {
    name: "Economy",
    totalQuestions: 365,
    totalThemes: 54,
    icon: BarChart3,
    color: "emerald",
    topics: [
      { name: "External Sector", count: 101 },
      { name: "Financial Institutions and Financial markets", count: 83 },
      { name: "Investment", count: 80 },
      { name: "Banking", count: 80 },
      { name: "RBI Functions", count: 74 },
      { name: "Fiscal Policy", count: 65 },
      { name: "Balance of Payments", count: 64 },
      { name: "Industries", count: 53 },
      { name: "Monetary Policy", count: 51 },
      { name: "Economic Development", count: 49 },
      { name: "Economic Growth", count: 47 },
      { name: "Liberalisation Privatisation Globalisation (LPG)", count: 45 },
      { name: "Public Debt", count: 44 },
      { name: "Taxation", count: 36 },
      { name: "Trade Policy", count: 35 },
      { name: "Foreign Exchange", count: 34 },
      { name: "Money and Money Supply", count: 32 },
      { name: "Budget", count: 32 },
      { name: "Inflation", count: 30 },
      { name: "National Income Accounting", count: 27 },
      { name: "Stock Market", count: 26 },
      { name: "Exchange Rate Mechanism", count: 25 },
      { name: "Agriculture", count: 22 },
      { name: "Revenue Accounts", count: 21 },
      { name: "Government Schemes", count: 20 },
      { name: "Capital Accounts", count: 20 },
      { name: "Debt Management", count: 19 },
      { name: "Microeconomics", count: 16 },
      { name: "Infrastructure", count: 15 },
      { name: "Employement Unemployment", count: 14 },
      { name: "External Debt", count: 14 },
      { name: "Energy Sector", count: 13 },
      { name: "Rural Development", count: 13 },
      { name: "Trade Deficit", count: 13 },
      { name: "Poverty", count: 12 },
      { name: "Digital Payments", count: 11 },
      { name: "Human Development and Skill Development", count: 10 },
      { name: "Labour Market", count: 8 },
      { name: "Savings", count: 8 },
      { name: "GST", count: 8 },
      { name: "Insurance", count: 7 },
      { name: "Digitization", count: 7 },
      { name: "Human Capital", count: 6 },
      { name: "FRBM Act", count: 5 },
      { name: "Real Estate", count: 5 },
      { name: "Demography", count: 4 },
      { name: "Urban Development", count: 3 },
      { name: "Sustainable Development", count: 3 },
      { name: "Mutual Funds", count: 2 },
      { name: "Public Distribution System", count: 1 },
      { name: "Food Security and NFSA", count: 1 },
      { name: "Transposrt and marketing of Agriculture Products", count: 1 },
      { name: "Land Reforms", count: 1 },
      { name: "Miscellaneous", count: 1 },
    ]
  },
  {
    name: "Environment",
    totalQuestions: 353,
    totalThemes: 82,
    icon: Leaf,
    color: "green",
    topics: [
      { name: "Biodiversity Conservation", count: 92 },
      { name: "Biodiversity", count: 85 },
      { name: "Climate Change", count: 65 },
      { name: "Endangered Species", count: 56 },
      { name: "Terrestrial Ecosystem or Biomes", count: 55 },
      { name: "International Environment Conventions and Agreements", count: 45 },
      { name: "Greenhouse gases", count: 44 },
      { name: "Climate Change Mitigation and Technology", count: 44 },
      { name: "Ecosystem", count: 43 },
      { name: "Protected Areas", count: 41 },
      { name: "Aquatic Ecosystem", count: 38 },
      { name: "Global warming", count: 37 },
      { name: "Sustainable Agriculture", count: 37 },
      { name: "International Initiatives for Monitoring and Mitigating Climate Change", count: 36 },
      { name: "Water Pollution", count: 33 },
      { name: "Air Pollution", count: 33 },
      { name: "National Environment Legislation", count: 32 },
      { name: "Wildlife Protection Act (WPA)", count: 26 },
      { name: "Deforestation and Desertification", count: 25 },
      { name: "National Parks", count: 24 },
      { name: "International Initiatives for Biodiversity Conservation", count: 24 },
      { name: "Population Interaction", count: 23 },
      { name: "Ecosystem Services", count: 23 },
      { name: "Nutrient Cycling", count: 21 },
      { name: "Biodiversity Loss", count: 20 },
      { name: "Habitat Loss", count: 20 },
      { name: "Adaptation", count: 19 },
      { name: "Soil Degradation", count: 18 },
      { name: "Biogeochemical Cycles", count: 18 },
      { name: "IUCN", count: 17 },
      { name: "Soil Pollution", count: 17 },
      { name: "Land Degradation", count: 17 },
      { name: "Wildlife Sanctuaries", count: 16 },
      { name: "Climate smart agriculture (CSA)", count: 16 },
      { name: "Wetlands", count: 14 },
      { name: "Non Conventional Energy Source", count: 14 },
      { name: "Renewable Energy", count: 13 },
      { name: "Ecosystem Health", count: 12 },
      { name: "Mutualism", count: 12 },
      { name: "Biosphere Reserves", count: 12 },
      { name: "Biofuels", count: 12 },
      { name: "Solid Waste Management", count: 12 },
      { name: "Aquatic Food Chain", count: 11 },
      { name: "Symbiosis", count: 11 },
      { name: "National Initiatives for Water Conservation", count: 10 },
      { name: "Predation", count: 9 },
      { name: "Mangroves", count: 9 },
      { name: "Food Web", count: 9 },
      { name: "Energy Flow", count: 9 },
      { name: "Decomposition", count: 8 },
      { name: "National Initiatives to tackle Water Pollution", count: 7 },
      { name: "Tiger Reserve", count: 7 },
      { name: "National Initiatives for Climate Change Mitigation and Technology", count: 7 },
      { name: "Terrestrial Food Chain", count: 7 },
      { name: "Ramsar sites", count: 7 },
      { name: "Corals", count: 6 },
      { name: "CITES", count: 6 },
      { name: "National Initiatives for Renewable Energy, Non Conventional Energy Source, Biofuels", count: 6 },
      { name: "Ozone depletion", count: 6 },
      { name: "Organic Farming", count: 5 },
      { name: "Environmental Impact Assessment (EIA)", count: 5 },
      { name: "E-Waste Management", count: 5 },
      { name: "Project Tiger", count: 5 },
      { name: "Ecological Succession", count: 5 },
      { name: "Wetland Conservation", count: 5 },
      { name: "Plastic Pollution", count: 4 },
      { name: "Zero Budget Natural Farming (ZBNF)", count: 3 },
      { name: "Detritus Food Chain", count: 3 },
      { name: "Elephant Reserve", count: 3 },
      { name: "Natural Farming", count: 3 },
      { name: "Ecological Pyramid", count: 3 },
      { name: "National Initiatives to tackle Air Pollution", count: 3 },
      { name: "Competition", count: 2 },
      { name: "National Wildlife Conservation Programme", count: 2 },
      { name: "Parasitism", count: 2 },
      { name: "Commensalism", count: 2 },
      { name: "International Initiatives for Land Restoration", count: 2 },
      { name: "National Clean Air Program (NCAP)", count: 1 },
      { name: "Permaculture", count: 1 },
      { name: "Radioactive Pollution", count: 1 },
      { name: "Agroforestry", count: 1 },
      { name: "Miscellaneous", count: 5 },
    ]
  },
  {
    name: "History (Modern India)",
    totalQuestions: 343,
    totalThemes: 63,
    icon: History,
    color: "rose",
    topics: [
      { name: "Personalities of Modern India", count: 148 },
      { name: "Governor Generals and viceroys of India", count: 50 },
      { name: "Leadership of Gandhi", count: 46 },
      { name: "Nationalist Movement 1905-1918", count: 45 },
      { name: "Independence and Partition", count: 34 },
      { name: "Moderates leadership", count: 25 },
      { name: "INC annual sessions", count: 25 },
      { name: "Socio Religious Reforms", count: 25 },
      { name: "Peasant Movements", count: 23 },
      { name: "Newspaper and publications", count: 23 },
      { name: "Civil Disobedience Movement", count: 22 },
      { name: "Economic policies of British Empire", count: 21 },
      { name: "British conquest of India", count: 21 },
      { name: "Nationalist Movement in 19th Century", count: 20 },
      { name: "Revolutionary Activities", count: 19 },
      { name: "Policies of British Empire Pre 1857", count: 19 },
      { name: "Administrative Organisation of British Empire", count: 18 },
      { name: "Emergence of Socialist Thought and Trade Union Movement", count: 18 },
      { name: "Economic Impact of British Rule", count: 17 },
      { name: "Second World War", count: 17 },
      { name: "Advent of Europeans", count: 17 },
      { name: "Cabinet Mission Plan", count: 16 },
      { name: "Administrative Changes After 1857", count: 16 },
      { name: "Government of India (GOI) Act 1935", count: 16 },
      { name: "Swadeshi Movement", count: 15 },
      { name: "Round Table Conference", count: 15 },
      { name: "Montagu Chelmsford reforms", count: 15 },
      { name: "Non Cooperation Movement", count: 14 },
      { name: "Quit India Movement", count: 14 },
      { name: "Simon Commission and Nehru Report", count: 14 },
      { name: "Rowlatt Act and Jallianwala Bagh Massacre", count: 14 },
      { name: "Extremists leadership", count: 14 },
      { name: "Land revenue policy of Britishers", count: 13 },
      { name: "Education policy of Britishers", count: 13 },
      { name: "Indian National Congress formation", count: 11 },
      { name: "Militant Nationalism", count: 11 },
      { name: "Cripps Mission", count: 11 },
      { name: "Social and Religious policies of British Empire", count: 10 },
      { name: "Rebellion of 1857", count: 10 },
      { name: "Movements of working class", count: 10 },
      { name: "Police and Judicial System in British India", count: 8 },
      { name: "Pre INC Organisations", count: 8 },
      { name: "French British rivalry", count: 8 },
      { name: "Tribal revolts", count: 8 },
      { name: "Indian Councils Acts", count: 7 },
      { name: "Muslim League formation", count: 6 },
      { name: "First World War", count: 6 },
      { name: "Wavell Plan", count: 6 },
      { name: "Civil Services in British India", count: 5 },
      { name: "Indian National Army (INA)", count: 5 },
      { name: "Tipu Sultan", count: 5 },
      { name: "Provincial Election 1937", count: 4 },
      { name: "Morley Minto reforms", count: 4 },
      { name: "Revolutionary Movement in 1920s", count: 4 },
      { name: "Marathas", count: 4 },
      { name: "Khilafat Movement", count: 3 },
      { name: "August offer", count: 3 },
      { name: "Jinnah's leadership", count: 2 },
      { name: "Swarajists and No Changers", count: 2 },
      { name: "Decline of Mughal Empire", count: 2 },
      { name: "Indian National Army (INA) trials", count: 2 },
      { name: "Rajagopalachari Formula", count: 2 },
      { name: "Miscellaneous", count: 14 },
    ]
  },
  {
    name: "Agriculture",
    totalQuestions: 221,
    totalThemes: 22,
    icon: Target,
    color: "amber",
    topics: [
      { name: "Government Policies and Schemes for Agriculture", count: 39 },
      { name: "Major Crops of India", count: 28 },
      { name: "Innovations in Agriculture", count: 14 },
      { name: "Minimum Support Price (MSP)", count: 14 },
      { name: "Storage Transport and marketing of Agricultural produce", count: 14 },
      { name: "Food Security Act", count: 12 },
      { name: "Food Processing Industry (FPI)", count: 11 },
      { name: "Soil and crop health", count: 10 },
      { name: "Farm Subsidy", count: 10 },
      { name: "Irrigation systems", count: 8 },
      { name: "Cropping Pattern", count: 8 },
      { name: "Public Distribution System (PDS)", count: 7 },
      { name: "Technology Mission", count: 5 },
      { name: "E-Technology in Agriculture", count: 3 },
      { name: "Animal Rearing", count: 2 },
      { name: "Soil Conservation", count: 2 },
      { name: "Climate Change and Agriculture", count: 1 },
      { name: "Land Reforms", count: 1 },
      { name: "Green Revolution", count: 1 },
      { name: "Land Use Pattern", count: 1 },
      { name: "Land degradation", count: 1 },
      { name: "Miscellaneous", count: 1 },
    ]
  },
  {
    name: "Geography (Human)",
    totalQuestions: 200,
    totalThemes: 15,
    icon: Globe,
    color: "cyan",
    topics: [
      { name: "Population", count: 64 },
      { name: "Minerals and Energy", count: 59 },
      { name: "Primary Activities", count: 55 },
      { name: "Land Resources and Agriculture", count: 52 },
      { name: "Manufacturing Industries", count: 38 },
      { name: "Transport and Communication", count: 33 },
      { name: "International Trade", count: 29 },
      { name: "Planning and Sustainable Development", count: 22 },
      { name: "Human Settlements", count: 21 },
      { name: "Human Development", count: 17 },
      { name: "Water Resources", count: 15 },
      { name: "Tertiary Activities", count: 11 },
      { name: "Urbanization", count: 7 },
      { name: "Secondary Activities", count: 6 },
      { name: "Miscellaneous", count: 1 },
    ]
  },
  {
    name: "International Relations",
    totalQuestions: 195,
    totalThemes: 16,
    icon: Globe,
    color: "sky",
    topics: [
      { name: "International Organizations", count: 89 },
      { name: "Regions and Countries in News", count: 85 },
      { name: "Regional Groupings", count: 52 },
      { name: "International Initiatives for Peace and Security", count: 39 },
      { name: "Global Groupings", count: 32 },
      { name: "International Treaties", count: 31 },
      { name: "International Trade", count: 28 },
      { name: "India and its Neighborhood", count: 15 },
      { name: "International Law", count: 14 },
      { name: "International Initiatives for Technology and Innovation", count: 10 },
      { name: "International Initiatives for Monitoring and Mitigating Climate Change", count: 6 },
      { name: "International Initiatives for Biodiversity Conservation", count: 4 },
      { name: "International Environment Conventions and Agreements", count: 3 },
      { name: "Indian Diaspora", count: 2 },
      { name: "International Initiatives for Land Restoration", count: 1 },
      { name: "Miscellaneous", count: 5 },
    ]
  },
  {
    name: "History (Ancient India)",
    totalQuestions: 171,
    totalThemes: 37,
    icon: History,
    color: "orange",
    topics: [
      { name: "Buddhism", count: 51 },
      { name: "Indian Philosophical Systems", count: 38 },
      { name: "Language and Literature of India", count: 35 },
      { name: "Archaeological Sites", count: 35 },
      { name: "Indian Heritage", count: 33 },
      { name: "Art and Architecture", count: 33 },
      { name: "Gupta Empire", count: 31 },
      { name: "Maurya Age", count: 27 },
      { name: "Jainism", count: 22 },
      { name: "Indian Sculpture", count: 19 },
      { name: "Temple Architecture", count: 16 },
      { name: "Vedic Age", count: 12 },
      { name: "Central Asia", count: 12 },
      { name: "Mahajanpadas", count: 11 },
      { name: "Harsha Empire", count: 10 },
      { name: "Pallava", count: 9 },
      { name: "IVC Indus Valley Civilization", count: 9 },
      { name: "Performing Art Traditions", count: 7 },
      { name: "Rig Veda Age", count: 7 },
      { name: "Magadha Age", count: 7 },
      { name: "Sangam Age", count: 7 },
      { name: "Chola Age", count: 7 },
      { name: "Imperial Chola", count: 6 },
      { name: "Chalukya", count: 6 },
      { name: "Mural Traditions", count: 5 },
      { name: "Foreign Travellers", count: 5 },
      { name: "Pandyas", count: 4 },
      { name: "Cheras", count: 4 },
      { name: "Iron Age", count: 3 },
      { name: "Satavahana", count: 3 },
      { name: "Chalcolithic Age", count: 2 },
      { name: "Coins", count: 2 },
      { name: "Rock Paintings", count: 2 },
      { name: "Bhakti and Sufi Movement", count: 2 },
      { name: "Dance forms", count: 1 },
      { name: "Neolithic Age", count: 1 },
      { name: "Miscellaneous", count: 12 },
    ]
  },
  {
    name: "Geography (Physical)",
    totalQuestions: 165,
    totalThemes: 55,
    icon: Globe,
    color: "blue",
    topics: [
       { name: "Pressure and Winds Circulation", count: 36 },
       { name: "Factors Influencing Climate", count: 34 },
       { name: "Distribution of Temperature and Pressure", count: 32 },
       { name: "Solar Radiation", count: 26 },
       { name: "Climatic Regions", count: 24 },
       { name: "Composition and Structure of Atmosphere", count: 21 },
       { name: "Heat Budget of the Earth", count: 19 },
       { name: "World Climate Classification", count: 18 },
       { name: "Distribution of Rainfall", count: 17 },
       { name: "Origin and Evolution of the Earth", count: 16 },
       { name: "Geomorphic Processes", count: 14 },
       { name: "Clouds and Precipitation", count: 13 },
       { name: "Temperature and Pressure in the Atmosphere", count: 13 },
       { name: "Ocean Currents", count: 12 },
       { name: "Distribution of Oceans and Continents", count: 11 },
       { name: "Ocean Water Movement", count: 11 },
       { name: "Ocean Temperature", count: 10 },
       { name: "Hydrological Cycle", count: 9 },
       { name: "Mineral and Rocks", count: 9 },
       { name: "Biomes", count: 9 },
       { name: "Tectonic Activity", count: 9 },
       { name: "Coriolis Force", count: 9 },
       { name: "Tropical Cyclones", count: 8 },
       { name: "Types of Rainfall", count: 8 },
       { name: "Ecosystems", count: 7 },
       { name: "Ocean Tides", count: 6 },
       { name: "Greenhouse Gases and its Effect", count: 6 },
       { name: "Major Landforms and their Evolution", count: 5 },
       { name: "Structure and Interior of the Earth", count: 5 },
       { name: "Volcanoes and Volcanic Landforms", count: 4 },
       { name: "Rock Cycle", count: 4 },
       { name: "Coastal Landforms", count: 4 },
       { name: "Weathering", count: 4 },
       { name: "River Landforms", count: 4 },
       { name: "Temperate Cyclones", count: 4 },
       { name: "Movement of the Indian Plate", count: 4 },
       { name: "Earthquakes", count: 4 },
       { name: "Sea Floor Spreading", count: 3 },
       { name: "Climate Change", count: 3 },
       { name: "Mass Movement", count: 3 },
       { name: "Plates and Plate Boundaries", count: 3 },
       { name: "Biogeochemical Cycles", count: 3 },
       { name: "Soil Formation", count: 3 },
       { name: "Ocean Floor", count: 3 },
       { name: "Deposition", count: 2 },
       { name: "Depositional Landforms", count: 2 },
       { name: "Erosional Landforms", count: 2 },
       { name: "Land and Sea Breezes", count: 2 },
       { name: "Erosion", count: 2 },
       { name: "Ocean Salinity", count: 2 },
       { name: "Global Warming", count: 2 },
       { name: "Glacial Landforms", count: 1 },
       { name: "Air Masses and Fronts", count: 1 },
       { name: "Distribution of Earthquakes and Volcanoes", count: 1 },
       { name: "Miscellaneous", count: 12 },
    ]
  },
  {
    name: "Geography (Indian Physical)",
    totalQuestions: 153,
    totalThemes: 34,
    icon: Globe,
    color: "teal",
    topics: [
      { name: "River System", count: 51 },
      { name: "Structure and Physiography of India", count: 45 },
      { name: "Peninsular Drainage System", count: 38 },
      { name: "Mountain Ranges", count: 27 },
      { name: "India - Location", count: 27 },
      { name: "West Flowing Rivers", count: 20 },
      { name: "East Flowing Rivers", count: 19 },
      { name: "Coastal Features", count: 19 },
      { name: "Ganga River System", count: 19 },
      { name: "Natural Vegetation of India", count: 16 },
      { name: "Lakes", count: 14 },
      { name: "Climates of India", count: 14 },
      { name: "Indus River System", count: 14 },
      { name: "Climatic Regions of India", count: 11 },
      { name: "Indian Monsoon System", count: 9 },
      { name: "National Parks", count: 7 },
      { name: "Soils of India", count: 7 },
      { name: "Protected Areas", count: 7 },
      { name: "Islands", count: 7 },
      { name: "Forest and Biodiversity Conservation", count: 6 },
      { name: "Wetlands", count: 6 },
      { name: "Mountain Peaks", count: 6 },
      { name: "Brahmaputra River System", count: 6 },
      { name: "Natural Hazards and Disasters", count: 5 },
      { name: "Ramsar sites", count: 5 },
      { name: "Mangroves", count: 4 },
      { name: "Wildlife Sanctuaries", count: 4 },
      { name: "Tiger Reserve", count: 3 },
      { name: "Biosphere Reserves", count: 2 },
      { name: "Soil Conservation", count: 1 },
      { name: "Elephant Reserve", count: 1 },
      { name: "Sacred groves", count: 1 },
      { name: "Mountain Passes", count: 1 },
      { name: "Miscellaneous", count: 11 },
    ]
  },
  {
    name: "Governance and Social Sector",
    totalQuestions: 116,
    totalThemes: 17,
    icon: Users,
    color: "violet",
    topics: [
      { name: "Governance", count: 73 },
      { name: "Welfare Schemes of Government in Social Sector", count: 59 },
      { name: "Human and Social Capital", count: 45 },
      { name: "Poverty", count: 35 },
      { name: "Welfare Schemes of Government in Health", count: 26 },
      { name: "Welfare Schemes of Government in Education and Skill Development", count: 25 },
      { name: "Regulatory Bodies", count: 17 },
      { name: "Information and Communication Technology in Governance", count: 14 },
      { name: "Self Help Groups (SHG)", count: 5 },
      { name: "Welfare Schemes of Government in Energy Transition", count: 5 },
      { name: "Public Distribution System (PDS)", count: 3 },
      { name: "Government Policies and Schemes for Agriculture", count: 3 },
      { name: "Welfare Schemes of Government in Environment", count: 3 },
      { name: "Food Security Act", count: 2 },
      { name: "Corporate Governance", count: 2 },
      { name: "Corporate Social Responsibility", count: 1 },
      { name: "Miscellaneous", count: 1 },
    ]
  },
  {
    name: "History (Medieval India)",
    totalQuestions: 114,
    totalThemes: 20,
    icon: History,
    color: "red",
    topics: [
      { name: "Mughals", count: 42 },
      { name: "Delhi Sultanate", count: 31 },
      { name: "Vijayanagara", count: 16 },
      { name: "Bhakti Movement", count: 15 },
      { name: "Cultural and Religious Developments Mughals", count: 14 },
      { name: "Empire Chronology", count: 11 },
      { name: "Decline of Mughal Empire", count: 11 },
      { name: "Marathas", count: 9 },
      { name: "Advent of Europeans", count: 7 },
      { name: "Deccan Sultanates", count: 7 },
      { name: "Sufi Movement", count: 6 },
      { name: "Turks", count: 6 },
      { name: "Rajputs", count: 6 },
      { name: "Advent of Portuguese", count: 5 },
      { name: "Imperial Cholas", count: 4 },
      { name: "Rashtrakutas", count: 2 },
      { name: "Bahamani Kingdom", count: 1 },
      { name: "Tipu Sultan", count: 1 },
      { name: "Pratiharas", count: 1 },
      { name: "Miscellaneous", count: 10 },
    ]
  },
  {
    name: "Geography (World Mapping)",
    totalQuestions: 97,
    totalThemes: 13,
    icon: Globe,
    color: "cyan",
    topics: [
      { name: "Regions and Countries in News", count: 68 },
      { name: "Neighboring Countries", count: 30 },
      { name: "Coastal Features", count: 20 },
      { name: "Continents", count: 19 },
      { name: "Oceans", count: 17 },
      { name: "Islands", count: 16 },
      { name: "River Systems", count: 14 },
      { name: "Lakes", count: 10 },
      { name: "Peninsulas", count: 7 },
      { name: "Mountain Ranges", count: 7 },
      { name: "Mountain Peaks", count: 2 },
      { name: "Deserts", count: 2 },
      { name: "Miscellaneous", count: 1 },
    ]
  },
  {
    name: "History (Culture)",
    totalQuestions: 49,
    totalThemes: 22,
    icon: Landmark,
    color: "amber",
    topics: [
      { name: "Indian Heritage", count: 43 },
      { name: "Performing Art Traditions", count: 25 },
      { name: "Art and Architecture", count: 13 },
      { name: "Dance forms", count: 12 },
      { name: "Bhakti and Sufi Movement", count: 9 },
      { name: "Language and Literature of India", count: 8 },
      { name: "Archaeological Sites", count: 8 },
      { name: "Temple Architecture", count: 7 },
      { name: "Buddhism", count: 6 },
      { name: "Indian Sculpture", count: 3 },
      { name: "Mural Traditions", count: 2 },
      { name: "IVC Indus Valley Civilization", count: 2 },
      { name: "Central Asia", count: 1 },
      { name: "Jainism", count: 1 },
      { name: "Pallava", count: 1 },
      { name: "Foreign Travellers", count: 1 },
      { name: "Indo-Islamic Architecture", count: 1 },
      { name: "Rig Veda Age", count: 1 },
      { name: "Vedic Age", count: 1 },
      { name: "Sangam Age", count: 1 },
      { name: "Cheras", count: 1 },
      { name: "Miscellaneous", count: 1 },
    ]
  },
  {
    name: "Security",
    totalQuestions: 25,
    totalThemes: 4,
    icon: Shield,
    color: "slate",
    topics: [
      { name: "Defence Technology", count: 15 },
      { name: "Defence Exercises and Operations", count: 5 },
      { name: "Defence Bureaucracy", count: 5 },
      { name: "Miscellaneous", count: 2 },
    ]
  }
];

export function MicroThemeAnalysis({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalQuestions = 3805;
  const totalThemes = 557;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="hover:bg-primary/10 rounded-xl"
          >
            <ChevronLeft className="mr-1 w-4 h-4" /> Back
          </Button>
          
          <div className="bg-primary/5 px-6 py-2 rounded-2xl border border-primary/10 flex items-center gap-4">
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Total Themes Analyzed</p>
              <p className="text-2xl font-black text-primary">{totalThemes}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4 shadow-inner">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-2 bg-gradient-to-r from-primary via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Priority Theme Analysis
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl mx-auto">
            A strategic breakdown of UPSC Prelims topics ranked by frequency and importance over 31 years of PYQs.
          </p>
        </div>

        <div className="grid gap-4">
          {themeData.map((sub, idx) => (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card 
                className={`overflow-hidden border-2 transition-all duration-300 ${
                  expanded === sub.name ? "ring-2 ring-primary/20 shadow-xl" : "hover:shadow-md"
                }`}
              >
                <div 
                  className="cursor-pointer p-4 md:p-6 flex items-center justify-between"
                  onClick={() => setExpanded(expanded === sub.name ? null : sub.name)}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center",
                      expanded === sub.name ? "bg-primary/10 text-primary" : `text-slate-600`
                    )}>
                      <sub.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-heading">{sub.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0">
                          {sub.totalThemes} Themes Detected
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-bold px-2 py-0 border-primary/20 text-primary">
                          Priority Sorted
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {expanded === sub.name ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>

                <AnimatePresence>
                  {expanded === sub.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 dark:border-slate-800"
                    >
                      <CardContent className="p-4 md:p-8 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Themes Ranked by Frequency</p>
                          {sub.topics.map((topic, tIdx) => (
                            <div 
                              key={topic.name} 
                              className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border/50 shadow-sm"
                            >
                              <div className="w-7 h-7 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                                {tIdx + 1}
                              </div>
                              <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300">
                                {topic.name}
                              </span>
                              
                              {tIdx < 3 ? (
                                <Badge className="ml-auto text-[8px] bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/10">High</Badge>
                              ) : tIdx < 9 ? (
                                <Badge className="ml-auto text-[8px] bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10 font-bold">Medium</Badge>
                              ) : (
                                <Badge className="ml-auto text-[8px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10 font-bold">Low</Badge>
                              )}
                            </div>
                          ))}
                          <p className="text-[10px] italic text-muted-foreground mt-4">* Topics are listed in descending order of historical importance.</p>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
