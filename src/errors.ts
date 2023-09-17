/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  name = "RequiredError";
  constructor(
    public field: string,
    msg?: string
  ) {
    super(msg);
  }
}
