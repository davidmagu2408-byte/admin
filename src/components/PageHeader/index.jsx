import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";

const PageHeader = ({
  title,
  breadcrumbs = [],
  addButtonText,
  addButtonLink,
}) => {
  return (
    <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
      <h5 className="mb-0">{title}</h5>
      <div className="ms-auto d-flex align-items-center">
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          {breadcrumbs.map((item, index) => (
            <StyledBreadcrumb
              key={index}
              component="a"
              href={item.href || "#"}
              label={item.label}
            />
          ))}
        </Breadcrumbs>
        {addButtonText && addButtonLink && (
          <a href={addButtonLink}>
            <Button className="btn-blue ms-3 ps-3 pe-3">{addButtonText}</Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
