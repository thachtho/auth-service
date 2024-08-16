import Ajv from 'ajv';

export function validator(message: any, schema: any) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  return validate(message);
}
