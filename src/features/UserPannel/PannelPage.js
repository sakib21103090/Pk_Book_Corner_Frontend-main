import Cart from "../Cart/Cart";
import Footer from "../Shared/Footer";
import Navigation from "../Shared/Navigation";
import UserPannel from "./UserPannel";

function PannelPage(){
    return(
        <div>
        <Navigation></Navigation>
             <UserPannel></UserPannel>
             <Footer></Footer>
                 
        </div>
    )
}
export default PannelPage;