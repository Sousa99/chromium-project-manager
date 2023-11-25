import { ModeFeatureBranch } from '@atoms/mode-button/ModeFeatureBranch';
import './ModeButtons.scss';
import { ITicketType } from '@models/ticket/ITicketType';
import { ModePullRequest } from '@atoms/mode-button/ModePullRequest';
import { ModeReport } from '@atoms/mode-button/ModeReport';

interface IProps {
    project_main: boolean,
    project_code: string,
    type: ITicketType,
    code: string,
    name: string,
}

export const ModeButtons = (props: IProps) => {
    const {
        project_main,
        project_code,
        type,
        code,
        name
    } = props;

    return (
        <section className='mode-buttons'>
            <ModeFeatureBranch type={type} code={code} name={name}/>
            <ModePullRequest type={type} code={code} name={name}/>
            <ModeReport project_main={project_main} project_code={project_code}
                type={type} code={code} name={name}/>
        </section>
    )
}