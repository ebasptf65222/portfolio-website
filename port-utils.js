import { createServer } from 'net';

/**
 * 检查端口是否可用
 * @param {number} port - 要检查的端口号
 * @returns {Promise<boolean>} 端口是否可用
 */
export function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(port, '127.0.0.1');
    server.on('listening', () => {
      server.close();
      resolve(true);
    });
    server.on('error', () => {
      resolve(false);
    });
  });
}

/**
 * 查找可用端口
 * @param {number} startPort - 起始端口号
 * @param {number} maxPort - 最大端口号
 * @returns {Promise<number|null>} 可用端口号，如果没找到则返回null
 */
export async function findAvailablePort(startPort, maxPort = 65535) {
  for (let port = startPort; port <= maxPort; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return null;
}

/**
 * 获取自动递增的可用端口
 * @param {number} defaultPort - 默认端口号
 * @returns {Promise<number>} 可用端口号
 */
export async function getAutoIncrementPort(defaultPort = 5173) {
  const port = await findAvailablePort(defaultPort);
  if (port === null) {
    throw new Error(`无法在范围 ${defaultPort}-${65535} 内找到可用端口`);
  }
  return port;
}