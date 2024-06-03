import "./LineItem.scss";
import { LineItemButton } from "@atoms/line-item-button/LineItemButton";

interface IProps {
  title: string;
  url: string;
  sub_buttons?: JSX.Element[];
}

export const LineItemUrl = (props: IProps) => {
  const { title, url, sub_buttons } = props;

  return (
    <section className="line-item-atom url">
      <LineItemButton
        title={title}
        sub_buttons={sub_buttons}
        button_function={() => window.open(url, "_blank")}
      />
    </section>
  );
};
