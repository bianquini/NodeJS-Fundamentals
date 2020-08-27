/* eslint-disable class-methods-use-this */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type was not expected');
    }

    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total < value
    ) {
      throw Error('Outcome greater than total balance');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
