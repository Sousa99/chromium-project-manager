import { TicketInfo } from '@helpers/project-modes-helper';
import './ModeButtons.scss';
import { ITicketType } from '@models/ticket/ITicketType';
import { IProjectModes } from '@models/project/IProjectModes';
import { ModeButton } from '@atoms/mode-button/ModeButton';


interface IProps {
    project_modes: IProjectModes,
    project_main: boolean,
    project_code: string,
    type: ITicketType,
    code: string,
    name: string,
}

export const ModeButtons = (props: IProps) => {
    const {
        project_modes,
        project_main,
        project_code,
        type,
        code,
        name
    } = props;

    const ticket_info: TicketInfo = {
        project_main,
        project_code,
        type,
        code,
        name
    };

    return (
        <section className='mode-buttons'>
            <ModeButton ticket_info={ticket_info} mode_format={project_modes.feature_branch} mode_name='Branch Name'/>
            <ModeButton ticket_info={ticket_info} mode_format={project_modes.pull_request} mode_name='Pull Request Title'/>
            <ModeButton ticket_info={ticket_info} mode_format={project_modes.report} mode_name='Report Code'/>
        </section>
    )
}