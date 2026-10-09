export const initialSecuritySettings = {
  twoFactorEnforced: true,
  dataEncryptionAtRest: true,
  sessionTimeoutMinutes: 15,
  ipWhitelistingEnabled: false,
  strictPasswordPolicy: true,
  biometricAllowed: true,
  auditLoggingRetentionDays: 90,
  tlsVersionEnforced: 'TLS 1.3'
};

export const initialSecurityIncidents = [
  {
    id: 'SEC-991',
    time: '2025-10-09 13:22',
    type: 'Brute Force Attempt',
    sourceIp: '185.220.101.5',
    target: 'admin@tradenest.in',
    severity: 'High',
    status: 'Blocked',
    actionTaken: 'IP blacklisted automatically by WAF'
  },
  {
    id: 'SEC-988',
    time: '2025-10-09 11:05',
    type: 'Unrecognized Device Login',
    sourceIp: '45.134.20.18',
    target: 'rohan.mehta@invest.in',
    severity: 'Medium',
    status: 'Resolved',
    actionTaken: 'OTP verification required and passed'
  },
  {
    id: 'SEC-984',
    time: '2025-10-08 18:40',
    type: 'Rate Limit Threshold Exceeded',
    sourceIp: '103.45.12.89',
    target: '/api/v1/quotes',
    severity: 'Low',
    status: 'Throttled',
    actionTaken: 'Client throttled for 15 minutes'
  },
  {
    id: 'SEC-979',
    time: '2025-10-08 09:12',
    type: 'Invalid API Key Signature',
    sourceIp: '192.178.4.11',
    target: '/api/v1/orders',
    severity: 'Medium',
    status: 'Rejected',
    actionTaken: 'Request rejected with HTTP 401'
  },
  {
    id: 'SEC-972',
    time: '2025-10-07 16:55',
    type: 'Concurrent Session Anomaly',
    sourceIp: '82.102.23.4',
    target: 'karan.s@wealthnest.com',
    severity: 'Low',
    status: 'Investigated',
    actionTaken: 'Old session terminated'
  }
];
