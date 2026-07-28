import { StyleSheet } from "@react-pdf/renderer"

export const NAVY = "#1B2A4A"
export const TEAL = "#1F7A6C"
export const LIGHT_GREY = "#F4F5F7"
export const MID_GREY = "#6B7280"
export const ACCENT = "#E8963C"

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
    paddingTop: "6cm",
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
  tocEntry: {
    fontSize: 11.5,
    marginBottom: 4,
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
