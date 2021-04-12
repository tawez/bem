module.exports = {
  coverageDirectory: 'coverage',
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'jsx', 'json', 'node'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules'
  ],
  modulePaths: [
    '<rootDir>/src'
  ],
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src'
  ],
  resetMocks: false,
  transform: {
    '^.+\.tsx?$': 'ts-jest'
  }
};
