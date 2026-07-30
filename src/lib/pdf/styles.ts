import { StyleSheet } from "@react-pdf/renderer"

export const NAVY = "#122045"
export const GOLD = "#C79A3D"
export const TEAL = "#1F7A6C"
export const LIGHT_GREY = "#F4F5F7"
export const MID_GREY = "#6B7280"

export const COMPANY_NAME = "PARAH Consulting & Services"
export const COMPANY_ADDRESS = "1567, Rue Noumbi, Plateaux des 15 ans, derrière l'école 8 Mars"
export const COMPANY_CITY = "Brazzaville, République du Congo"
export const COMPANY_EMAIL = "parahconsulting@gmail.com"
export const COMPANY_PHONE = "00242 04 434 33 33"

export const styles = StyleSheet.create({
  page: {
    padding: "2cm",
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: "#22252A",
  },
  coverPage: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "4cm",
  },
  coverMonogram: {
    fontSize: 72,
    fontWeight: "bold",
    color: GOLD,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: GOLD,
    borderRadius: 4,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  coverTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: NAVY,
    textAlign: "center",
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 14,
    color: TEAL,
    textAlign: "center",
    marginBottom: 6,
  },
  coverMeta: {
    fontSize: 11,
    color: MID_GREY,
    textAlign: "center",
    marginBottom: 4,
  },
  coverFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: NAVY,
    paddingVertical: 16,
    paddingHorizontal: "2cm",
  },
  coverFooterText: {
    fontSize: 9,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 2,
  },
  header: {
    position: "absolute",
    top: "1cm",
    left: "2cm",
    right: "2cm",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: GOLD,
  },
  headerText: {
    fontSize: 8,
    color: NAVY,
    fontWeight: "bold",
  },
  headerSubtext: {
    fontSize: 7,
    color: MID_GREY,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: "bold",
    color: NAVY,
    marginBottom: 10,
    marginTop: 6,
  },
  subHeading: {
    fontSize: 12.5,
    fontWeight: "bold",
    color: TEAL,
    marginBottom: 6,
    marginTop: 10,
  },
  bodyText: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: "#22252A",
    marginBottom: 8,
  },
  tocTable: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: LIGHT_GREY,
    borderRadius: 2,
    overflow: "hidden",
  },
  tocRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tocNum: {
    width: 24,
    fontSize: 11,
    fontWeight: "bold",
    color: GOLD,
  },
  tocLabel: {
    flex: 1,
    fontSize: 11,
    color: "#22252A",
  },
  disclaimer: {
    fontSize: 9,
    fontStyle: "italic",
    color: MID_GREY,
    lineHeight: 1.4,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GREY,
    marginBottom: 10,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    marginRight: 8,
  },
  contactBlock: {
    marginTop: 16,
    padding: 14,
    backgroundColor: NAVY,
    borderRadius: 4,
  },
  contactLine: {
    fontSize: 10,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  contactLabel: {
    fontSize: 9,
    color: GOLD,
    marginBottom: 2,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: "1.3cm",
    left: "2cm",
    right: "2cm",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: LIGHT_GREY,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    color: MID_GREY,
  },
})
