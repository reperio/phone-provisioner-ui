import {ConfigProperty, Organization} from "../../../store/store";

export interface PageComponentProps {
    actions?: any;
    options?: {[property: string]: ConfigProperty; };
    organization?: Organization;
    base?: boolean;
}