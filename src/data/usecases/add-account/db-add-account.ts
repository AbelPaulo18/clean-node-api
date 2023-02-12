import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    await this.addAccountRepository.add(
      Object.assign(accountData, { password: hashedPassword })
    );
    return new Promise((resolve) => resolve(null));
  }
}
