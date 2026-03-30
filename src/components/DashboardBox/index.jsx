import Button from "@mui/material/Button";

const DashboardBox = ({ color, icon, grow, title = "Total Items", value = "0" }) => {
    const gradientStyle = {
        background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
    };

    return (
        <Button style={gradientStyle} className={`dashboardBox ${grow ? 'flex-grow' : 'flex-initial'}`}>

            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white mb-0">{title}</h4>
                    <span className="text-white">{value}</span>
                </div>
                <div className="ms-auto">
                    <span className="icon">{icon}</span>
                </div>
            </div>
        </Button >
    );
};

export default DashboardBox;