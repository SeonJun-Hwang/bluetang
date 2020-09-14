module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
    '@Parser': '<rootDir>/src/Parser/index',
    '@Chunker': '<rootDir>/src/Parser/Chunker/index',
    '~utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testMatch: [
    '<rootDir>/**/*.test.(js|jsx|ts|tsx)',
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/'],
};
