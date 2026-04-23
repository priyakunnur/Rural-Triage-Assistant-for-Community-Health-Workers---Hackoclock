export type Facility = {
  id: string;
  name: { en: string; kn: string };
  type: "Hospital" | "Clinic" | "PHC";
  phone: string;
  lat: number;
  lng: number;
  address: { en: string; kn: string };
};

export const FACILITIES: Facility[] = [
  // ===== Karnataka — Bengaluru =====
  { id: "ka-blr-1", name: { en: "Victoria Hospital", kn: "ವಿಕ್ಟೋರಿಯಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-26703294", lat: 12.9606, lng: 77.5747, address: { en: "Fort Rd, Bengaluru", kn: "ಫೋರ್ಟ್ ರಸ್ತೆ, ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-2", name: { en: "Bowring & Lady Curzon Hospital", kn: "ಬೌರಿಂಗ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-25591325", lat: 12.9833, lng: 77.6047, address: { en: "Shivajinagar, Bengaluru", kn: "ಶಿವಾಜಿನಗರ, ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-3", name: { en: "K.C. General Hospital", kn: "ಕೆ.ಸಿ. ಜನರಲ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-23440730", lat: 13.0089, lng: 77.5712, address: { en: "Malleshwaram, Bengaluru", kn: "ಮಲ್ಲೇಶ್ವರಂ, ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-4", name: { en: "NIMHANS", kn: "ನಿಮ್ಹಾನ್ಸ್" }, type: "Hospital", phone: "080-26995001", lat: 12.9432, lng: 77.5949, address: { en: "Hosur Rd, Bengaluru", kn: "ಹೊಸೂರು ರಸ್ತೆ, ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-5", name: { en: "Jayadeva Institute of Cardiology", kn: "ಜಯದೇವ ಹೃದ್ರೋಗ ಸಂಸ್ಥೆ" }, type: "Hospital", phone: "080-22977200", lat: 12.9166, lng: 77.5990, address: { en: "BG Road, Bengaluru", kn: "ಬಿ.ಜಿ. ರಸ್ತೆ, ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-6", name: { en: "Kidwai Memorial Cancer Institute", kn: "ಕಿದ್ವಾಯಿ ಕ್ಯಾನ್ಸರ್ ಸಂಸ್ಥೆ" }, type: "Hospital", phone: "080-26094000", lat: 12.9430, lng: 77.5950, address: { en: "Hombegowda Nagar, Bengaluru", kn: "ಹೊಂಬೇಗೌಡ ನಗರ" } },
  { id: "ka-blr-7", name: { en: "Indira Gandhi Institute of Child Health", kn: "ಇಂದಿರಾ ಗಾಂಧಿ ಮಕ್ಕಳ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-26564516", lat: 12.9410, lng: 77.5965, address: { en: "South Hospital Complex, Bengaluru", kn: "ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-8", name: { en: "Manipal Hospital Old Airport Rd", kn: "ಮಣಿಪಾಲ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-25024444", lat: 12.9606, lng: 77.6500, address: { en: "Old Airport Rd, Bengaluru", kn: "ಹಳೆಯ ವಿಮಾನ ನಿಲ್ದಾಣ ರಸ್ತೆ" } },
  { id: "ka-blr-9", name: { en: "Apollo Hospital Bannerghatta", kn: "ಅಪೋಲೋ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-26304050", lat: 12.8932, lng: 77.5979, address: { en: "Bannerghatta Rd, Bengaluru", kn: "ಬನ್ನೇರುಘಟ್ಟ ರಸ್ತೆ" } },
  { id: "ka-blr-10", name: { en: "Fortis Hospital Cunningham Rd", kn: "ಫೋರ್ಟಿಸ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-66214444", lat: 12.9893, lng: 77.5934, address: { en: "Cunningham Rd, Bengaluru", kn: "ಕನ್ನಿಂಗ್‌ಹ್ಯಾಮ್ ರಸ್ತೆ" } },
  { id: "ka-blr-11", name: { en: "Narayana Health City", kn: "ನಾರಾಯಣ ಹೆಲ್ತ್ ಸಿಟಿ" }, type: "Hospital", phone: "080-71222200", lat: 12.8081, lng: 77.6786, address: { en: "Bommasandra, Bengaluru", kn: "ಬೊಮ್ಮಸಂದ್ರ" } },
  { id: "ka-blr-12", name: { en: "St. John's Medical College Hospital", kn: "ಸೇಂಟ್ ಜಾನ್ಸ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-22065000", lat: 12.9277, lng: 77.6207, address: { en: "Koramangala, Bengaluru", kn: "ಕೋರಮಂಗಲ" } },
  { id: "ka-blr-13", name: { en: "M.S. Ramaiah Memorial Hospital", kn: "ಎಂ.ಎಸ್. ರಾಮಯ್ಯ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-23608888", lat: 13.0306, lng: 77.5662, address: { en: "MSRIT, Bengaluru", kn: "ಬೆಂಗಳೂರು" } },
  { id: "ka-blr-14", name: { en: "Sakra World Hospital", kn: "ಸಕ್ರಾ ವರ್ಲ್ಡ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-49694969", lat: 12.9279, lng: 77.6868, address: { en: "Bellandur, Bengaluru", kn: "ಬೆಲ್ಲಂದೂರು" } },
  { id: "ka-blr-15", name: { en: "Whitefield UPHC", kn: "ವೈಟ್‌ಫೀಲ್ಡ್ ನಗರ ಪಿಎಚ್‌ಸಿ" }, type: "PHC", phone: "080-28452020", lat: 12.9698, lng: 77.7500, address: { en: "Whitefield, Bengaluru", kn: "ವೈಟ್‌ಫೀಲ್ಡ್" } },

  // ===== Karnataka — Mysuru region =====
  { id: "ka-mys-1", name: { en: "K.R. Hospital Mysuru", kn: "ಕೆ.ಆರ್. ಆಸ್ಪತ್ರೆ ಮೈಸೂರು" }, type: "Hospital", phone: "0821-2423300", lat: 12.3066, lng: 76.6553, address: { en: "Sayyaji Rao Rd, Mysuru", kn: "ಸಯ್ಯಾಜಿ ರಾವ್ ರಸ್ತೆ, ಮೈಸೂರು" } },
  { id: "ka-mys-2", name: { en: "JSS Hospital Mysuru", kn: "ಜೆಎಸ್‌ಎಸ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0821-2548349", lat: 12.3072, lng: 76.6498, address: { en: "Ramanuja Rd, Mysuru", kn: "ರಾಮಾನುಜ ರಸ್ತೆ" } },
  { id: "ka-mys-3", name: { en: "Apollo BGS Hospital", kn: "ಅಪೋಲೋ ಬಿಜಿಎಸ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0821-2568888", lat: 12.3375, lng: 76.6325, address: { en: "Adichunchanagiri Rd, Mysuru", kn: "ಮೈಸೂರು" } },
  { id: "ka-mys-4", name: { en: "Cheluvamba Hospital (Women & Children)", kn: "ಚೆಲುವಾಂಬಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0821-2423800", lat: 12.3115, lng: 76.6504, address: { en: "Irwin Rd, Mysuru", kn: "ಮೈಸೂರು" } },

  // ===== Karnataka — Mangaluru / Udupi (Coastal) =====
  { id: "ka-mng-1", name: { en: "Wenlock District Hospital", kn: "ವೆನ್ಲಾಕ್ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0824-2423450", lat: 12.8703, lng: 74.8421, address: { en: "Hampankatta, Mangaluru", kn: "ಮಂಗಳೂರು" } },
  { id: "ka-mng-2", name: { en: "KMC Hospital Mangaluru", kn: "ಕೆಎಂಸಿ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0824-2238000", lat: 12.8730, lng: 74.8430, address: { en: "Attavar, Mangaluru", kn: "ಅಟ್ಟಾವರ" } },
  { id: "ka-mng-3", name: { en: "Father Muller Medical College", kn: "ಫಾದರ್ ಮುಲ್ಲರ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0824-2238000", lat: 12.8865, lng: 74.8467, address: { en: "Kankanady, Mangaluru", kn: "ಕಂಕನಾಡಿ" } },
  { id: "ka-udp-1", name: { en: "Kasturba Hospital Manipal", kn: "ಕಸ್ತೂರ್ಬಾ ಆಸ್ಪತ್ರೆ ಮಣಿಪಾಲ" }, type: "Hospital", phone: "0820-2922761", lat: 13.3525, lng: 74.7868, address: { en: "Manipal, Udupi", kn: "ಮಣಿಪಾಲ, ಉಡುಪಿ" } },

  // ===== Karnataka — Hubballi / Dharwad / Belagavi (North) =====
  { id: "ka-hub-1", name: { en: "KIMS Hubballi", kn: "ಕಿಮ್ಸ್ ಹುಬ್ಬಳ್ಳಿ" }, type: "Hospital", phone: "0836-2370057", lat: 15.3494, lng: 75.1240, address: { en: "Vidyanagar, Hubballi", kn: "ವಿದ್ಯಾನಗರ, ಹುಬ್ಬಳ್ಳಿ" } },
  { id: "ka-dwd-1", name: { en: "SDM Medical College Hospital", kn: "ಎಸ್‌ಡಿಎಂ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0836-2477561", lat: 15.4184236, lng: 75.0451301, address: { en: "Sattur, Dharwad", kn: "ಧಾರವಾಡ" } },
  { id: "ka-bgm-1", name: { en: "BIMS Belagavi", kn: "ಬಿಮ್ಸ್ ಬೆಳಗಾವಿ" }, type: "Hospital", phone: "0831-2491071", lat: 15.8705414, lng: 74.5090802, address: { en: "Belagavi", kn: "ಬೆಳಗಾವಿ" } },
  { id: "ka-bgm-2", name: { en: "KLE Dr. Prabhakar Kore Hospital", kn: "ಕೆಎಲ್‌ಇ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0831-2473777", lat: 15.8868496, lng: 74.5170068, address: { en: "Nehru Nagar, Belagavi", kn: "ನೆಹರೂ ನಗರ, ಬೆಳಗಾವಿ" } },
  { id: "ka-hbl-1", name: { en: "Suchirayu Hospital", kn: "ಸುಚಿರಾಯು ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0836-2239000", lat: 15.3526759, lng: 75.1218772, address: { en: "Vidyanagar, Hubballi", kn: "ವಿದ್ಯಾನಗರ, ಹುಬ್ಬಳ್ಳಿ" } },
  // ===== Karnataka — Kalaburagi / Ballari / Vijayapura =====
  { id: "ka-klb-1", name: { en: "GIMS Kalaburagi", kn: "ಜಿಮ್ಸ್ ಕಲಬುರಗಿ" }, type: "Hospital", phone: "08472-263500", lat: 17.3297, lng: 76.8343, address: { en: "Kalaburagi", kn: "ಕಲಬುರಗಿ" } },
  { id: "ka-blr-bly-1", name: { en: "VIMS Ballari", kn: "ವಿಮ್ಸ್ ಬಳ್ಳಾರಿ" }, type: "Hospital", phone: "08392-235559", lat: 15.1394, lng: 76.9214, address: { en: "Ballari", kn: "ಬಳ್ಳಾರಿ" } },
  { id: "ka-vjp-1", name: { en: "BLDE Shri B M Patil Hospital", kn: "ಬಿಎಲ್‌ಡಿಇ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08352-262770", lat: 16.8302, lng: 75.7100, address: { en: "Vijayapura", kn: "ವಿಜಯಪುರ" } },

  // ===== Karnataka — Shivamogga / Davanagere / Chitradurga =====
  { id: "ka-shi-1", name: { en: "McGann Teaching District Hospital", kn: "ಮ್ಯಾಕ್‌ಗ್ಯಾನ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08182-271392", lat: 13.9299, lng: 75.5681, address: { en: "Shivamogga", kn: "ಶಿವಮೊಗ್ಗ" } },
  { id: "ka-dvg-1", name: { en: "Bapuji Hospital Davanagere", kn: "ಬಾಪೂಜಿ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08192-231285", lat: 14.4644, lng: 75.9218, address: { en: "Davanagere", kn: "ದಾವಣಗೆರೆ" } },
  { id: "ka-ctd-1", name: { en: "Chitradurga District Hospital", kn: "ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08194-222019", lat: 14.2226, lng: 76.4030, address: { en: "Chitradurga", kn: "ಚಿತ್ರದುರ್ಗ" } },

  // ===== Karnataka — Other districts =====
  { id: "ka-tmk-1", name: { en: "Tumakuru District Hospital", kn: "ತುಮಕೂರು ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0816-2278601", lat: 13.3409, lng: 77.1010, address: { en: "Tumakuru", kn: "ತುಮಕೂರು" } },
  { id: "ka-kol-1", name: { en: "SNR District Hospital Kolar", kn: "ಎಸ್‌ಎನ್‌ಆರ್ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08152-222244", lat: 13.1372, lng: 78.1297, address: { en: "Kolar", kn: "ಕೋಲಾರ" } },
  { id: "ka-mdy-1", name: { en: "MIMS Mandya", kn: "ಮಿಮ್ಸ್ ಮಂಡ್ಯ" }, type: "Hospital", phone: "08232-220100", lat: 12.5218, lng: 76.8951, address: { en: "Mandya", kn: "ಮಂಡ್ಯ" } },
  { id: "ka-has-1", name: { en: "HIMS Hassan", kn: "ಹಿಮ್ಸ್ ಹಾಸನ" }, type: "Hospital", phone: "08172-268601", lat: 13.0033, lng: 76.0961, address: { en: "Hassan", kn: "ಹಾಸನ" } },
  { id: "ka-cha-1", name: { en: "Chamarajanagar District Hospital", kn: "ಚಾಮರಾಜನಗರ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08226-222301", lat: 11.9261, lng: 76.9437, address: { en: "Chamarajanagar", kn: "ಚಾಮರಾಜನಗರ" } },
  { id: "ka-rmg-1", name: { en: "Ramanagara District Hospital", kn: "ರಾಮನಗರ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "080-27270101", lat: 12.7159, lng: 77.2800, address: { en: "Ramanagara", kn: "ರಾಮನಗರ" } },
  { id: "ka-ckm-1", name: { en: "Chikkamagaluru District Hospital", kn: "ಚಿಕ್ಕಮಗಳೂರು ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08262-234188", lat: 13.3161, lng: 75.7720, address: { en: "Chikkamagaluru", kn: "ಚಿಕ್ಕಮಗಳೂರು" } },
  { id: "ka-kdg-1", name: { en: "Madikeri District Hospital", kn: "ಮಡಿಕೇರಿ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08272-225507", lat: 12.4244, lng: 75.7382, address: { en: "Madikeri, Kodagu", kn: "ಮಡಿಕೇರಿ, ಕೊಡಗು" } },
  { id: "ka-uk-1", name: { en: "Karwar District Hospital", kn: "ಕಾರವಾರ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08382-226507", lat: 14.8136, lng: 74.1297, address: { en: "Karwar, Uttara Kannada", kn: "ಕಾರವಾರ" } },
  { id: "ka-bdr-1", name: { en: "Bidar Institute of Medical Sciences", kn: "ಬೀದರ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08482-229152", lat: 17.9133, lng: 77.5301, address: { en: "Bidar", kn: "ಬೀದರ್" } },
  { id: "ka-rcr-1", name: { en: "RIMS Raichur", kn: "ರಿಮ್ಸ್ ರಾಯಚೂರು" }, type: "Hospital", phone: "08532-222266", lat: 16.2076, lng: 77.3463, address: { en: "Raichur", kn: "ರಾಯಚೂರು" } },
  { id: "ka-kpl-1", name: { en: "Koppal Institute of Medical Sciences", kn: "ಕೊಪ್ಪಳ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08539-220200", lat: 15.3450, lng: 76.1551, address: { en: "Koppal", kn: "ಕೊಪ್ಪಳ" } },
  { id: "ka-ggk-1", name: { en: "Gadag District Hospital", kn: "ಗದಗ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08372-238298", lat: 15.4310, lng: 75.6300, address: { en: "Gadag", kn: "ಗದಗ" } },
  { id: "ka-hvi-1", name: { en: "Haveri District Hospital", kn: "ಹಾವೇರಿ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08375-249349", lat: 14.7935, lng: 75.4045, address: { en: "Haveri", kn: "ಹಾವೇರಿ" } },
  { id: "ka-bgl-1", name: { en: "Bagalkot District Hospital", kn: "ಬಾಗಲಕೋಟೆ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08354-235260", lat: 16.1862, lng: 75.6961, address: { en: "Bagalkot", kn: "ಬಾಗಲಕೋಟೆ" } },
  { id: "ka-yvg-1", name: { en: "Yadgir District Hospital", kn: "ಯಾದಗಿರಿ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "08473-253077", lat: 16.7700, lng: 77.1370, address: { en: "Yadgir", kn: "ಯಾದಗಿರಿ" } },

  // ===== Karnataka — PHCs / Clinics (rural) =====
  { id: "ka-phc-1", name: { en: "PHC Nelamangala", kn: "ಪಿಎಚ್‌ಸಿ ನೆಲಮಂಗಲ" }, type: "PHC", phone: "080-27722034", lat: 13.1007, lng: 77.3936, address: { en: "Nelamangala", kn: "ನೆಲಮಂಗಲ" } },
  { id: "ka-phc-2", name: { en: "PHC Devanahalli", kn: "ಪಿಎಚ್‌ಸಿ ದೇವನಹಳ್ಳಿ" }, type: "PHC", phone: "080-27682033", lat: 13.2437, lng: 77.7172, address: { en: "Devanahalli", kn: "ದೇವನಹಳ್ಳಿ" } },
  { id: "ka-phc-3", name: { en: "PHC Magadi", kn: "ಪಿಎಚ್‌ಸಿ ಮಾಗಡಿ" }, type: "PHC", phone: "080-27745022", lat: 12.9579, lng: 77.2245, address: { en: "Magadi", kn: "ಮಾಗಡಿ" } },
  { id: "ka-phc-4", name: { en: "PHC Hosakote", kn: "ಪಿಎಚ್‌ಸಿ ಹೊಸಕೋಟೆ" }, type: "PHC", phone: "080-27931037", lat: 13.0707, lng: 77.7980, address: { en: "Hosakote", kn: "ಹೊಸಕೋಟೆ" } },
  { id: "ka-phc-5", name: { en: "PHC Sringeri", kn: "ಪಿಎಚ್‌ಸಿ ಶೃಂಗೇರಿ" }, type: "PHC", phone: "08265-250222", lat: 13.4198, lng: 75.2570, address: { en: "Sringeri", kn: "ಶೃಂಗೇರಿ" } },
  { id: "ka-phc-6", name: { en: "PHC Sakleshpur", kn: "ಪಿಎಚ್‌ಸಿ ಸಕಲೇಶಪುರ" }, type: "PHC", phone: "08173-244238", lat: 12.9436, lng: 75.7849, address: { en: "Sakleshpur", kn: "ಸಕಲೇಶಪುರ" } },
  { id: "ka-phc-7", name: { en: "PHC Sirsi", kn: "ಪಿಎಚ್‌ಸಿ ಸಿರ್ಸಿ" }, type: "PHC", phone: "08384-226339", lat: 14.6195, lng: 74.8354, address: { en: "Sirsi", kn: "ಸಿರ್ಸಿ" } },
  { id: "ka-phc-8", name: { en: "PHC Gokak", kn: "ಪಿಎಚ್‌ಸಿ ಗೋಕಾಕ್" }, type: "PHC", phone: "08332-225033", lat: 16.1700, lng: 74.8300, address: { en: "Gokak", kn: "ಗೋಕಾಕ್" } },
  { id: "ka-cln-1", name: { en: "Community Clinic Channapatna", kn: "ಸಮುದಾಯ ಚಿಕಿತ್ಸಾಲಯ" }, type: "Clinic", phone: "080-27251234", lat: 12.6517, lng: 77.2070, address: { en: "Channapatna", kn: "ಚನ್ನಪಟ್ಟಣ" } },
  { id: "ka-cln-2", name: { en: "Rural Clinic Tiptur", kn: "ಗ್ರಾಮೀಣ ಚಿಕಿತ್ಸಾಲಯ ತಿಪಟೂರು" }, type: "Clinic", phone: "08134-251020", lat: 13.2566, lng: 76.4794, address: { en: "Tiptur", kn: "ತಿಪಟೂರು" } },

  // ===== Other Indian states (major referral hospitals) =====
  { id: "in-dl-1", name: { en: "AIIMS Delhi", kn: "ಏಮ್ಸ್ ದೆಹಲಿ" }, type: "Hospital", phone: "011-26588500", lat: 28.5672, lng: 77.2100, address: { en: "Ansari Nagar, New Delhi", kn: "ನವದೆಹಲಿ" } },
  { id: "in-dl-2", name: { en: "Safdarjung Hospital", kn: "ಸಫ್ದರ್‌ಜಂಗ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "011-26165060", lat: 28.5685, lng: 77.2069, address: { en: "Ansari Nagar West, Delhi", kn: "ದೆಹಲಿ" } },
  { id: "in-mh-1", name: { en: "KEM Hospital Mumbai", kn: "ಕೆಇಎಂ ಆಸ್ಪತ್ರೆ ಮುಂಬೈ" }, type: "Hospital", phone: "022-24107000", lat: 19.0030, lng: 72.8419, address: { en: "Parel, Mumbai", kn: "ಮುಂಬೈ" } },
  { id: "in-mh-2", name: { en: "Tata Memorial Hospital", kn: "ಟಾಟಾ ಮೆಮೋರಿಯಲ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "022-24177000", lat: 19.0040, lng: 72.8425, address: { en: "Parel, Mumbai", kn: "ಮುಂಬೈ" } },
  { id: "in-mh-3", name: { en: "Sassoon General Hospital Pune", kn: "ಸಸ್ಸೂನ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "020-26128000", lat: 18.5310, lng: 73.8736, address: { en: "Pune", kn: "ಪುಣೆ" } },
  { id: "in-tn-1", name: { en: "Apollo Hospital Chennai", kn: "ಅಪೋಲೋ ಆಸ್ಪತ್ರೆ ಚೆನ್ನೈ" }, type: "Hospital", phone: "044-28290200", lat: 13.0633, lng: 80.2517, address: { en: "Greams Rd, Chennai", kn: "ಚೆನ್ನೈ" } },
  { id: "in-tn-2", name: { en: "Rajiv Gandhi Govt General Hospital", kn: "ರಾಜೀವ್ ಗಾಂಧಿ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "044-25305000", lat: 13.0810, lng: 80.2780, address: { en: "Chennai", kn: "ಚೆನ್ನೈ" } },
  { id: "in-tn-3", name: { en: "CMC Vellore", kn: "ಸಿಎಂಸಿ ವೆಲ್ಲೂರು" }, type: "Hospital", phone: "0416-2281000", lat: 12.9244, lng: 79.1353, address: { en: "Vellore", kn: "ವೆಲ್ಲೂರು" } },
  { id: "in-tg-1", name: { en: "NIMS Hyderabad", kn: "ನಿಮ್ಸ್ ಹೈದರಾಬಾದ್" }, type: "Hospital", phone: "040-23489000", lat: 17.4279, lng: 78.4480, address: { en: "Punjagutta, Hyderabad", kn: "ಹೈದರಾಬಾದ್" } },
  { id: "in-tg-2", name: { en: "Osmania General Hospital", kn: "ಉಸ್ಮಾನಿಯಾ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "040-24600136", lat: 17.3666, lng: 78.4750, address: { en: "Afzalgunj, Hyderabad", kn: "ಹೈದರಾಬಾದ್" } },
  { id: "in-ap-1", name: { en: "King George Hospital", kn: "ಕಿಂಗ್ ಜಾರ್ಜ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0891-2564891", lat: 17.7295, lng: 83.3169, address: { en: "Visakhapatnam", kn: "ವಿಶಾಖಪಟ್ಟಣ" } },
  { id: "in-kl-1", name: { en: "Government Medical College Thiruvananthapuram", kn: "ಸರ್ಕಾರಿ ವೈದ್ಯಕೀಯ ಕಾಲೇಜು" }, type: "Hospital", phone: "0471-2528300", lat: 8.5246, lng: 76.9407, address: { en: "Thiruvananthapuram", kn: "ತಿರುವನಂತಪುರ" } },
  { id: "in-kl-2", name: { en: "Amrita Hospital Kochi", kn: "ಅಮೃತ ಆಸ್ಪತ್ರೆ ಕೊಚ್ಚಿ" }, type: "Hospital", phone: "0484-2851234", lat: 10.0260, lng: 76.3025, address: { en: "Kochi", kn: "ಕೊಚ್ಚಿ" } },
  { id: "in-wb-1", name: { en: "SSKM Hospital Kolkata", kn: "ಎಸ್‌ಎಸ್‌ಕೆಎಂ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "033-22041101", lat: 22.5390, lng: 88.3450, address: { en: "Kolkata", kn: "ಕೋಲ್ಕತ್ತಾ" } },
  { id: "in-up-1", name: { en: "SGPGI Lucknow", kn: "ಎಸ್‌ಜಿಪಿಜಿಐ ಲಕ್ನೋ" }, type: "Hospital", phone: "0522-2495000", lat: 26.7456, lng: 80.9462, address: { en: "Lucknow", kn: "ಲಕ್ನೋ" } },
  { id: "in-rj-1", name: { en: "SMS Hospital Jaipur", kn: "ಎಸ್‌ಎಂಎಸ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "0141-2518100", lat: 26.9075, lng: 75.8118, address: { en: "Jaipur", kn: "ಜೈಪುರ" } },
  { id: "in-gj-1", name: { en: "Civil Hospital Ahmedabad", kn: "ಸಿವಿಲ್ ಆಸ್ಪತ್ರೆ" }, type: "Hospital", phone: "079-22683721", lat: 23.0590, lng: 72.6088, address: { en: "Ahmedabad", kn: "ಅಹಮದಾಬಾದ್" } },
  { id: "in-mp-1", name: { en: "AIIMS Bhopal", kn: "ಏಮ್ಸ್ ಭೋಪಾಲ್" }, type: "Hospital", phone: "0755-2932400", lat: 23.2110, lng: 77.4480, address: { en: "Bhopal", kn: "ಭೋಪಾಲ್" } },
  { id: "in-od-1", name: { en: "AIIMS Bhubaneswar", kn: "ಏಮ್ಸ್ ಭುವನೇಶ್ವರ" }, type: "Hospital", phone: "0674-2476789", lat: 20.1850, lng: 85.8175, address: { en: "Bhubaneswar", kn: "ಭುವನೇಶ್ವರ" } },
  { id: "in-pb-1", name: { en: "PGIMER Chandigarh", kn: "ಪಿಜಿಐಎಂಇಆರ್ ಚಂಡೀಗಢ" }, type: "Hospital", phone: "0172-2746018", lat: 30.7649, lng: 76.7748, address: { en: "Chandigarh", kn: "ಚಂಡೀಗಢ" } },

  // ===== National emergency =====
  { id: "in-emerg", name: { en: "Emergency Ambulance (108)", kn: "ತುರ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್ (108)" }, type: "Hospital", phone: "108", lat: 12.9716, lng: 77.5946, address: { en: "All India — toll free", kn: "ಭಾರತಾದ್ಯಂತ — ಉಚಿತ" } },
];

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(s)) * 10) / 10;
}