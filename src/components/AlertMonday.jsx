import { AlertBanner, AlertBannerLink, AlertBannerText } from "monday-ui-react-core";
import styled from "styled-components";


export default function Alert(){
    return(
        <ContainerAlert>
        <AlertBanner
            bannerText="Alert banner message"
            className="monday-alert-banner"
            linkText="saiba mais"
            backgroundColor={AlertBanner.backgroundColors.WARNING}
            isCloseHidden={true}
            >
                <AlertBannerText text="Nunca realize serviços externos em dias chuvosos, risco de raios!" />
                <AlertBannerLink
                    href="https://blog-pt.checklistfacil.com/nr-21/"
                    text="saiba mais"
                />
        </AlertBanner>
        </ContainerAlert>
    )
}

const ContainerAlert = styled.div`
    .monday-alert-banner{
        position: fixed;
    }
`;