export default interface IRoutes {
	path: string;
	displayName?: string;
	protected?: boolean;
	component: () => JSX.Element;
}
