/**
 * This is a test message from RFC5769 - Test Vectors for Session Traversal Utilities for NAT (STUN)
 * https://tools.ietf.org/html/rfc5769
 *
 *
 *
 * 2.2.  Sample IPv4 Response
 *
 * This response uses the following parameter:
 *
 * Password:  "VOkJxbRl1RmTxUk/WvJxBt" (without quotes)
 *
 * Software name:  "test vector" (without quotes)
 *
 * Mapped address:  192.0.2.1 port 32853
 *
 *   01 01 00 3c     Response type and message length
 *   21 12 a4 42     Magic cookie
 *   b7 e7 a7 01  }
 *   bc 34 d6 86  }  Transaction ID
 *   fa 87 df ae  }
 *   80 22 00 0b     SOFTWARE attribute header
 *   74 65 73 74  }
 *   20 76 65 63  }  UTF-8 server name
 *   74 6f 72 20  }
 *   00 20 00 08     XOR-MAPPED-ADDRESS attribute header
 *   00 01 a1 47     Address family (IPv4) and xor'd mapped port number
 *   e1 12 a6 43     Xor'd mapped IPv4 address
 *   00 08 00 14     MESSAGE-INTEGRITY attribute header
 *   2b 91 f5 99  }
 *   fd 9e 90 c3  }
 *   8c 74 89 f9  }  HMAC-SHA1 fingerprint
 *   2a f9 ba 53  }
 *   f0 6b e7 d7  }
 *   80 28 00 04     FINGERPRINT attribute header
 *   c0 7d 4c 96     CRC32 fingerprint
 *
 */

var Buffer = require('buffer').Buffer;
module.exports = new Buffer([
    0x01, 0x01, 0x00, 0x3c, //    Response type and message length
    0x21, 0x12, 0xa4, 0x42, //    Magic cookie
    0xb7, 0xe7, 0xa7, 0x01, // }
    0xbc, 0x34, 0xd6, 0x86, // }  Transaction ID
    0xfa, 0x87, 0xdf, 0xae, // }
    0x80, 0x22, 0x00, 0x0b, //    SOFTWARE attribute header
    0x74, 0x65, 0x73, 0x74, // }
    0x20, 0x76, 0x65, 0x63, // }  UTF-8 server name
    0x74, 0x6f, 0x72, 0x20, // }
    0x00, 0x20, 0x00, 0x08, //    XOR-MAPPED-ADDRESS attribute header
    0x00, 0x01, 0xa1, 0x47, //    Address family (IPv4) and xor'd mapped port number
    0xe1, 0x12, 0xa6, 0x43, //    Xor'd mapped IPv4 address
    0x00, 0x08, 0x00, 0x14, //    MESSAGE-INTEGRITY attribute header
    0x2b, 0x91, 0xf5, 0x99, // }
    0xfd, 0x9e, 0x90, 0xc3, // }
    0x8c, 0x74, 0x89, 0xf9, // }  HMAC-SHA1 fingerprint
    0x2a, 0xf9, 0xba, 0x53, // }
    0xf0, 0x6b, 0xe7, 0xd7, // }
    0x80, 0x28, 0x00, 0x04, //    FINGERPRINT attribute header
    0xc0, 0x7d, 0x4c, 0x96  //    CRC32 fingerprint
]);
