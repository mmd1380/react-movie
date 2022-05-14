export interface LoggerProps {
	fileName?: string;
	type?: "ERROR" | "LOG";
	description?: string;
	log?: any;
}

const Logger = {
	log({ fileName, log, type, description }: LoggerProps) {
		console.log(
			`
        \n
  fileName: ${fileName ?? "-"},
  type: ${type ?? "-"},
  description: ${description ?? "-"},
  log: ${log ?? "-"}
        \n
      `
		);
	},
};

export default Logger;
