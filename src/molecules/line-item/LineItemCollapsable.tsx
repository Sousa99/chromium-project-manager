import { Collapse } from '@mui/material';

import './LineItem.scss';

import { LineItemButton } from '@atoms/line-item-button/LineItemButton';

interface IProps {
  title: string,
  iconOpened: JSX.Element,
  iconClosed: JSX.Element,
  children?: JSX.Element,
  sub_buttons?: JSX.Element[],
  // Interaction with collapsible
  expanded: boolean,
  button_function: () => void,
}

export const LineItemCollapsable = (props: IProps): JSX.Element => {
  const {
    title,
    iconOpened,
    iconClosed,
    children = [],
    sub_buttons,
    expanded,
    button_function,
  } = props;

  const gradientStyle = {
    background: `linear-gradient(to right, rgba(135, 189, 81, 0.5), transparent 5%)`,
  };

  return (
    <section className='line-item-atom collapsable'>
      <LineItemButton
        title={title}
        icon={ expanded ? iconOpened : iconClosed }
        sub_buttons={sub_buttons}
        button_styling={ expanded ? gradientStyle : {} }
        button_function={button_function}
      />
      <Collapse in={expanded}>
        { children }
      </Collapse>
    </section>
  )
}