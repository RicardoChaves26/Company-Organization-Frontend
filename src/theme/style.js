import colors from './colors';

const styleGlobal = {

  screenMarginDesktop: 24,
  screenMarginMobile: 14,
  sectionGap: 12,

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  getContentWrapper: (isMobile) => ({
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: isMobile ? 14 : 24,
    gap: 2, // Espaciado vertical entre Header, Card, Tabla.
  }),
};

export default styleGlobal;